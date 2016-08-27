(function () {
    'use strict';
    angular.module('app').service('movementService', movementService);

    movementService.$inject = ['dragService', 'resizeService'];
    function movementService(dragService, resizeService):Object {

        return {
            tileEntered: tileEntered,
            tilePressed: tilePressed,
            tilePressedWithControl: tilePressedWithControl,
            mouseReleased: mouseReleased
        };

        function tileEntered(row:number, tile:number):void {
            dragService.tileEntered(row, tile);
            resizeService.tileEntered(tile);
        }
        
        function tilePressed(row:number, tile:number):void {
            dragService.tilePressed(row, tile);
        }

        function tilePressedWithControl(row:number, tile:number):void {
            resizeService.tilePressedWithControl(row, tile);
        }
        
        function mouseReleased():void {
            dragService.mouseReleased();
            resizeService.mouseReleased();
        }
    }
})();

