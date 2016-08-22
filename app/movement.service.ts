(function () {
    'use strict';

    angular.module('app').service('movementService', movementService);

    movementService.$inject = [];

    function movementService() {

        return {
            tileEntered: tileEntered,
            tilePressed: tilePressed,
            mouseReleased: mouseReleased
        };

        function tileEntered(row, tile) {
            console.log("Tile entered at (" + row + "," + tile + ")");
        }

        function tilePressed(row, tile) {
            console.log("Tile pressed at (" + row + "," + tile + ")");
        }

        function mouseReleased() {
            console.log("Mouse released");
        }
    }
})();

