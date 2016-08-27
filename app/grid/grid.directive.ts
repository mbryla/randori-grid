(function () {
    'use strict';
    angular.module('app').directive('grid', grid);

    function grid():Object {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/grid/grid.html',
            controller: 'GridController',
            controllerAs: 'gridController'
        };
    }
})();

