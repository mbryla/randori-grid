(function () {
    'use strict';
    angular.module('app') .controller('RowController', rowController);

    rowController.$inject = ['gridService', 'movementService'];
    function rowController(gridService:Object, movementService:Object):void {
        var vm:Object = this;
        vm.data = gridService.data[vm.rowId];

        vm.tileEntered = function (tile:number):void {
            movementService.tileEntered(vm.rowId, tile);
        };

        vm.tilePressed = function (tile:number, event:Object):void {
            if (event.ctrlKey) {
                movementService.tilePressedWithControl(vm.rowId, tile);
            } else {
                movementService.tilePressed(vm.rowId, tile);
            }

        };
    }
})();

