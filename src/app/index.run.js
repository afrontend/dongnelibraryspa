(function() {
  'use strict';

  angular
    .module('dongnelibraryspa')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
