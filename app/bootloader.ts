(function () {
    angular.module('app')
        .service('bootloader', bootloader);

    bootloader.$inject = ['gridService', 'movementService'];

    function bootloader(gridService, movementService) {
        var run = function () {
        };

        return {
            run: run
        };
    }
})();
