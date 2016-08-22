(function () {
    angular.module('app')
        .service('bootloader', bootloader);

    bootloader.$inject = ['gridService'];

    function bootloader(gridService) {
        var run = function () {
            var block1 = {
                color: 'red',
                start: 0,
                duration: 2,
                id: 1
            };

            var block2 = {
                color: 'lime',
                start: 1,
                duration: 3,
                id: 2
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
