(function () {
    'use strict';
    angular.module('app').controller('MouseUpController', mouseUpController);

    mouseUpController.$inject = ['movementService'];
    function mouseUpController(movementService:Object):void {
        var vm:Object = this;

        vm.mouseUp = function ():void {
            movementService.mouseReleased();
        };
    }
})();

