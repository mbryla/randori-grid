(function () {
    angular.module('app').service('bootloader', bootloader);

    bootloader.$inject = ['$rootScope', 'pubSubService', 'gridService'];
    function bootloader($rootScope, pubSubService, gridService):Object {
        var run = function ():void {
            let block1:Block = {
                color: 'red',
                row: 1,
                start: 2,
                length: 3,
                id: 1
            };

            let block2:Block = {
                color: 'lime',
                row: 1,
                start: 5,
                length: 8,
                id: 2
            };

            gridService.initialize(3, 24);
            pubSubService.subscribe('block-modified', function (block) {
                console.log('block modified', block);
            });
            pubSubService.subscribe('block-created', function (block) {
                console.log('block created', block);
            });

            setTimeout(function () {
                $rootScope.$apply(function () {
                    console.log('added blocks');

                    gridService.setBlock(block1);
                    gridService.setBlock(block2);
                });
            }, 500);
        };

        return {
            run: run
        };
    }
})();
