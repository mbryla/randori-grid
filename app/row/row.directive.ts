(function () {
    'use strict';
    angular.module('app').directive('row', row);

    function row():Object {
        return {
            restrict: 'E',
            replace: true,
            bindToController: true,
            scope: {
                rowId: '='
            },
            templateUrl: 'app/row/row.html',
            controller: 'RowController',
            controllerAs: 'rowController'
        };
    }
})();

