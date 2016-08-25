(function () {
    angular.module('app').service('bootloader', bootloader);

    bootloader.$inject = ['gridService'];
    function bootloader(gridService:Object):Object {
        var run = function ():void {
            let block1:Block = {
                color: 'red',
                start: 0,
                length: 2,
                id: 1
            };

            let block2:Block = {
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
