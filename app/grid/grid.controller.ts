(function () {
    'use strict';
    angular.module('app') .controller('GridController', gridController);

    gridController.$inject = ['gridService'];
    function gridController(gridService):void {
        var vm = this;
        vm.data = gridService.data;
    }
})();

