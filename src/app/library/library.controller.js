(function() {
  'use strict';

  angular
    .module('dongnelibraryspa')
    .controller('LibraryController', LibraryController);

  /** @ngInject */
  function LibraryController($timeout, webDevTec, toastr, libraryService, _) {
    var vm = this;

    vm.libraryList = [];
    vm.libraryNames = [];
    vm.libraryButtons = [];
    vm.showToastr = showToastr;
    vm.search = search;
    vm.clear = clear;
    vm.selectLibrary = selectLibrary;
    vm.showList = showList;
    vm.hideList = hideList;
    vm.text = '';
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
    vm.selected = false;

    activate();

    function activate() {
      //loadLibraryList('javascript');
      loadLibraryNames();
    }

    function showToastr(str) {
      toastr.info(str);
    }

    function appendMetaData(data) {
      data.hideListFlag = true;
      if(vm.selected) {
        data.show = false;
      } else {
        data.show = true;
      }
      data.error = false;
      data.validLength = _.filter(data.books, function (book) {
          return (book.exist === true)
      }).length;
    }

    function loadLibraryList(title) {
      angular.forEach(vm.libraryNames, function (libraryName) {
          $timeout(function(){
              libraryService.getLibrary({
                  title: title,
                  libraryName: libraryName
                }, function (error, data) {
                  if(error.code === 0) {
                    appendMetaData(data);
                    vm.libraryList.push(data);
                    updateLibraryButton();
                  } else {
                    data.error == true;
                    vm.libraryList.push({});
                    showToastr(libraryName+", "+error.msg);
                  }
              })
            },500);
      })
    }

    function loadLibraryNames() {
      libraryService.getLibraryNames(function (data) {
          vm.libraryNames = data;
          initLibraryButton();
      })
    }

    function search() {
      showToastr("search ("+vm.text+")");
      vm.libraryList = [];
      updateLibraryButton();
      vm.selected = false;
      loadLibraryList(vm.text);
    }

    function clear() {
      vm.text = '';
      vm.libraryList = [];
      updateLibraryButton();
      vm.selected = false;
    }

    function selectLibrary(index) {
      var libraryName = vm.libraryButtons[index].libraryName;

      var found = _.find(vm.libraryList, function(lib){
        return lib.libraryName === libraryName;
      });

      if(found) {
        _.each(vm.libraryList, function(library) {
            library.show = false;
        });
        found.show = true;
        found.hideListFlag = false;
        vm.selected = true;
      } else {
        showToastr(libraryName +  ", 검색 결과가 없습니다.");
      }
    }

    function showList() {
      vm.selected = false;
      _.each(vm.libraryList, function(library) {
          library.show = true;
          library.hideListFlag = false;
          library.hideTitleFlag = true;
      });
    }

    function hideList() {
      vm.selected = false;
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

    function updateLibraryButton() {
      _.each(vm.libraryButtons, function(btn) {
          var found = _.find(vm.libraryList, function(lib){
              return lib.libraryName === btn.libraryName;
          });

          if(found) {
            btn.searchResult = true;
          } else {
            btn.searchResult = false;
          }
      });
    }

  }
})();
