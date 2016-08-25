(function () {
    'use strict';
    angular.module('app') .controller('RowController', rowController);
    
    rowController.$inject = ['gridService', 'movementService'];
    function rowController(gridService, movementService) {
        var vm = this;
        vm.data = gridService.data[vm.rowId];

        vm.tileEntered = function (tile) {
            movementService.tileEntered(vm.rowId, tile);
        };

        vm.tilePressed = function (tile, event) {
            if(event.ctrlKey) {
                movementService.tilePressedWithControl(vm.rowId, tile);
            } else {
                movementService.tilePressed(vm.rowId, tile);
            }

        };
    }
})();

