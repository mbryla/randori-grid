(function () {
    'use strict';

    angular.module('app').service('movementService', movementService);

    movementService.$inject = ['gridService'];

    function movementService(gridService) {

        return {
            tileEntered: tileEntered,
            tilePressed: tilePressed,
            mouseReleased: mouseReleased
        };

        function tileEntered(row, tile) {
            console.log("Tile entered at (" + row + "," + tile + ")");
        }

        function tilePressed(row, tile) {
            console.log("Tile pressed at (" + row + "," + tile + ")", gridService.data[row][tile].block);
        }

        function mouseReleased() {
            console.log("Mouse released");
        }
    }
})();

