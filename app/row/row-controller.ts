(function () {

    angular.module('app')
        .controller('RowController', rowController);

    rowController.$inject = ['gridService'];

    function rowController(gridService) {
        var vm = this;
        vm.data = gridService.data[vm.rowId];

        gridService.setBlock(1, {
            color: 'red',
            start: 0,
            duration: 2
        });
    }
})();

