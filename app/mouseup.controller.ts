(function () {

    angular.module('app')
        .controller('MouseUpController', mouseUpController);

    mouseUpController.$inject = ['movementService'];

    function mouseUpController(movementService) {
        var vm = this;

        vm.mouseUp = function () {
            movementService.mouseReleased();
        };
    }
})();

