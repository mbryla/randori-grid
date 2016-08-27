(function () {
    'use strict';
    angular.module('app').controller('MouseUpController', mouseUpController);

    mouseUpController.$inject = ['movementService'];
    function mouseUpController(movementService):void {
        var vm = this;

        vm.mouseUp = function ():void {
            movementService.mouseReleased();
        };
    }
})();

