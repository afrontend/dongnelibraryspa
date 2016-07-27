(function() {
  'use strict';

  angular
    .module('dongnelibraryspa')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
    })
    .state('library', {
        url: '/',
        templateUrl: 'app/library/library.html',
        controller: 'LibraryController',
        controllerAs: 'library'
    })
    ;

    $urlRouterProvider.otherwise('/');
  }

})();
