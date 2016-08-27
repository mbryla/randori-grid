(function () {
    'use strict';
    angular.module('app') .controller('RowController', rowController);

    rowController.$inject = ['gridService', 'movementService'];
    function rowController(gridService, movementService):void {
        var vm = this;
        vm.data = gridService.data[vm.rowId];

        vm.tileEntered = function (tile:number):void {
            movementService.tileEntered(vm.rowId, tile);
        };

        vm.tilePressed = function (tile:number, event):void {
            if (event.ctrlKey) {
                movementService.tilePressedWithControl(vm.rowId, tile);
            } else {
                movementService.tilePressed(vm.rowId, tile);
            }
        };
    }
})();

