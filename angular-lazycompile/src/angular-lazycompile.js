'use strict';

angular.module('angular-lazycompile', [
])

.directive('lazyCompile', ['$compile', function ($compile) {
  return {
    scope: {
      lazyCompile: '=',
      lazyDecode: '='
    },
    link: function postLink(scope, element, attrs) {
      var voidCompile = scope.$watch('lazyCompile', function(value) {
        if(value && value != "false") {
          if(scope.lazyDecode) {
            value = decodeURIComponent(value);
          }
          // when the 'compile' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current
          $compile(element.contents())(scope);

          // Use un-watch feature to ensure compilation happens only once.
          voidCompile();
        }
      });
    }
  }
}]);