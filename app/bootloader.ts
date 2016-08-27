(function () {
    angular.module('app').service('bootloader', bootloader);

    bootloader.$inject = ['$rootScope', 'gridService'];
    function bootloader($rootScope, gridService):Object {
        var run = function ():void {
            let block1:Block = {
                color: 'red',
                row: 1,
                start: 0,
                length: 2,
                id: 1
            };

            let block2:Block = {
                color: 'lime',
                row: 2,
                start: 1,
                length: 4,
                id: 2
            };

            gridService.initialize(3, 24);

            setTimeout(function() {
                $rootScope.$apply(function() {
                    console.log('added blocks');

                    gridService.setBlock(block1.row, block1);
                    gridService.setBlock(block2.row, block2);
                });
            }, 500);
        };

        return {
            run: run
        };
    }
})();
