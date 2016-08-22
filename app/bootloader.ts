(function () {
    angular.module('app')
        .service('bootloader', bootloader);

    bootloader.$inject = ['gridService', 'movementService'];

    function bootloader(gridService, movementService) {
        var run = function () {
            var block1 = {
                color: 'red',
                start: 0,
                duration: 2
            };

            var block2 = {
                color: 'lime',
                start: 1,
                duration: 3
            };

            gridService.setBlock(1, block1);
            gridService.clearBlock(1, block1);
            gridService.setBlock(1, block2);
        };

        return {
            run: run
        };
    }
})();
