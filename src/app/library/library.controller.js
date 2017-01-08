(function() {
  'use strict';

  angular
    .module('dongnelibraryspa')
    .controller('LibraryController', LibraryController);

  /** @ngInject */
  function LibraryController($log, $timeout, webDevTec, toastr, libraryService, _) {
    var vm = this;

    vm.libraryList        = [];
    vm.libraryNames       = [];
    vm.libraryButtons     = [];
    vm.showToastr         = showToastr;
    vm.search             = search;
    vm.clear              = clear;
    vm.selectAllLibrary   = selectAllLibrary;
    vm.unselectAllLibrary = unselectAllLibrary;
    vm.selectLibrary      = selectLibrary;
    vm.showList           = showList;
    vm.hideList           = hideList;
    vm.text               = '';
    vm.toggleList = function (index) {
      var lib = vm.libraryList[index];
      if(lib.books.length !== 0) {
        if(lib.hideListFlag) {
          lib.hideListFlag = false;
        } else {
          lib.hideListFlag = true;
        }
      }
    }

    vm.searchName = '';

    /* Selected Library */
    var SL = (function (updateUI) {
        var selectedLibrary = [];
        return {
          clear: function () {
            selectedLibrary = [];
            updateUI();
          },
          add: function (name) {
            if(angular.isArray(name)) {
              selectedLibrary = selectedLibrary.concat(name);
            } else {
              selectedLibrary.push(name);
            }
            $log.debug('add: ' + selectedLibrary);
            updateUI(selectedLibrary);
          },
          remove: function (name) {
            selectedLibrary = _.filter(selectedLibrary, function (slname) {
                return name !== slname;
            });
            $log.debug('remove: ' + selectedLibrary);
            updateUI(selectedLibrary);
          },
          get: function () {
            return selectedLibrary;
          },
          count: function () {
            return selectedLibrary.length;
          },
          exist: function (targetName) {
            var rt = false;
            var found = _.find(selectedLibrary, function (name) {
                return name === targetName;
            });
            if(angular.isUndefined(found)) {
              rt = false;
            } else {
              rt = true;
            }
            return rt;
          }
        };
    })(refreshButtons);

    activate();

    function activate() {
      //loadLibraryList('javascript');
      loadLibraryNames();
    }

    function showToastr(str) {
      toastr.info(str);
    }

    function appendMeta(data, libraryCount) {
      data.hideListFlag = true;
      if(libraryCount && libraryCount === 1) {
        data.hideListFlag = false;
      }
      data.show = true;
      data.error = false;
      data.validLength = _.filter(data.books, function (book) {
          return (book.exist === true)
      }).length;
    }

    function loadLibraryList(title, libraryNames) {
      if(!angular.isArray(libraryNames)) {
        showToastr("도서관 선택을 다시해 주세요.");
        return;
      }
      var currentTicket = ticket.next(libraryNames.length);
      angular.forEach(libraryNames, function (libraryName) {
          $timeout(function(){
              libraryService.getLibrary({
                  title: title,
                  libraryName: libraryName
                }, function (error, data) {
                  if(error.code === 0) {
                    if(currentTicket === ticket.get()) {
                      appendMeta(data, ticket.getLibraryCount());
                      vm.libraryList.push(data);
                    } else {
                      //showToastr(libraryName+" was ignored.");
                    }
                  } else {
                    data.error == true;
                    vm.libraryList.push({});
                    showToastr(libraryName+", "+error.msg);
                  }
              })
          });
      })
    }

    function loadLibraryNames() {
      libraryService.getLibraryNames(function (data) {
          vm.libraryNames = data;
          initLibraryButton();
      })
    }

    function search() {
      if(vm.text.length !== 0) {
        vm.libraryList = [];
        var count = SL.count();
        if(count > 0) {
          showToastr(count + " 개의 도서관을 검색합니다.");
        } else {
          showToastr('모든 도서관을 검색합니다.');
          selectAllLibrary();
        }
        loadLibraryList(vm.text, SL.get());
      }
    }

    function clear() {
      vm.text = '';
      vm.searchText = '';
      vm.libraryList = [];
      ticket.next();
    }

    function selectAllLibrary() {
      SL.clear();
      SL.add(vm.libraryNames);
    }

    function unselectAllLibrary() {
      SL.clear();
    }

    function refreshButtons(slnames) {
      if(slnames) {
        _.each(vm.libraryButtons, function(btn){
            var found = _.find(slnames, function(libraryName) {
                return btn.libraryName === libraryName;
            });
            if(found) {
              btn.searchResult = true;
            } else {
              btn.searchResult = false;
            }
        });
      } else {
        _.each(vm.libraryButtons, function(btn){
            btn.searchResult = false;
        });
      }
    }

    function hideAllResult() {
      _.each(vm.libraryList, function(library) {
          library.show = false;
      });
    }

    function showLibraryResult(library) {
      library.show = true;
      library.hideListFlag = false;
    }

    function isValidResult() {
      return (vm.libraryList.length > 0)
    }

    function selectLibrary(libraryName) {
      //var libraryName = vm.libraryButtons[index].libraryName;
      if (isValidResult()) {
        var found = _.find(vm.libraryList, function(lib){
            return lib.libraryName === libraryName;
        });

        if(found) {
          hideAllResult();
          showLibraryResult(found);
        }
      } else {
        if(SL.exist(libraryName) === true) {
          SL.remove(libraryName);
        } else {
          SL.add(libraryName);
        }
      }
    }

    function showList() {
      _.each(vm.libraryList, function(library) {
          library.show = true;
          library.hideListFlag = false;
          library.hideTitleFlag = true;
      });
    }

    function hideList() {
      _.each(vm.libraryList, function(library) {
          library.show = true;
          library.hideListFlag = true;
          library.hideTitleFlag = false;
      });
    }

    function initLibraryButton() {
      vm.libraryButtons = _.map(vm.libraryNames, function(name){
          var o = {
            libraryName: name,
            searchResult: false
          };
          return o;
      });
    }

    var ticket = (function () {
        var ticketNumber = 0;
        var libraryCount = 0;
        return {
          getLibraryCount: function () {
            return libraryCount;
          },
          get: function () {
            return ticketNumber;
          },
          next: function (count) {
            if(count) {
              libraryCount = count;
            } else {
              libraryCount = 0;
            }
            ticketNumber = ticketNumber + 1;
            return ticketNumber;
          }
        };
    })();

  }
})();
