(function () {
    'use strict';
    angular.module('app').service('movementService', movementService);

    movementService.$inject = ['dragService', 'resizeService'];
    function movementService(dragService, resizeService) {

        return {
            tileEntered: tileEntered,
            tilePressed: tilePressed,
            tilePressedWithControl: tilePressedWithControl,
            mouseReleased: mouseReleased
        };

        function tileEntered(row, tile):void {
            dragService.tileEntered(row, tile);
            resizeService.tileEntered(tile);
        }

        function tilePressed(row, tile):void {
            dragService.tilePressed(row, tile);
        }

        function tilePressedWithControl(row, tile):void {
            resizeService.tilePressedWithControl(row, tile);
        }

        function mouseReleased():void {
            dragService.mouseReleased();
            resizeService.mouseReleased();
        }
    }
})();

