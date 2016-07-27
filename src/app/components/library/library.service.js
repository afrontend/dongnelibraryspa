(function() {
  'use strict';

  angular
      .module('dongnelibraryspa')
      .service('libraryService', libraryService);

  /** @ngInject */
  function libraryService($http, $log) {
    this.getLibrary = getLibrary;
    this.getLibraryNames = getLibraryNames;

    function getLibrary(option, callback) {
      $http({
          method: 'GET',
          url: '/books/search',
          timeout: 30000,
          params: {
            title: option.title,
            libraryName: option.libraryName
          }
      }).then(function successCallback(response) {
          //$log.log("response.data: " + angular.fromJson(response.data));
          if(callback) {
            callback({
                code: 0,
                msg: ''
              }, response.data)
          }
        }, function errorCallback(response) {
          if(response.status === -1) {
            callback({
                code: 1,
                msg: '검색에 실패했습니다.'
              }, response.data)
          }
          $log.log('status: ' + response.status);
          $log.log('statusText: ' + response.statusText);
        }
      );
    }

    function getLibraryNames(callback) {
      $http({
          method: 'GET',
          url: '/books/libraryNames'
      }).then(function successCallback(response) {
          //$log.log("response.data: " + angular.fromJson(response.data));
          if(callback) {
            callback(response.data)
          }
        }, function errorCallback(response) {
          $log.log('status: ' + response.status);
          $log.log('statusText: ' + response.statusText);
        }
      );
    }

  }

})();
