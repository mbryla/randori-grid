(function () {
    angular.module('app')
        .service('bootloader', bootloader);

    bootloader.$inject = ['gridService'];

    function bootloader(gridService) {
        var run = function () {
            var block1 = {
                color: 'red',
                start: 0,
                length: 2,
                id: 1
            };

            var block2 = {
                color: 'lime',
                start: 1,
                length: 4,
                id: 2
            };

            gridService.setBlock(1, block1);
            gridService.setBlock(2, block2);
        };

        return {
            run: run
        };
    }
})();
