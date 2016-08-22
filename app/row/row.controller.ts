(function () {

    angular.module('app')
        .controller('RowController', rowController);

    rowController.$inject = ['gridService', 'movementService'];

    function rowController(gridService, movementService) {
        var vm = this;
        vm.data = gridService.data[vm.rowId];

        vm.tileEntered = function (tile) {
            movementService.tileEntered(vm.rowId, tile);
        };

        vm.tilePressed = function (tile) {
            movementService.tilePressed(vm.rowId, tile);
        };
    }
})();

