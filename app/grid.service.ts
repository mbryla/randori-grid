(function () {
    'use strict';

    angular.module('app').service('gridService', gridService);

    gridService.$inject = [];

    function gridService() {

        interface Block {
            row:number,
            start:number,
            duration:number,
            color:string
        }

        interface Tile {
            color:string
        }

        var data:Tile[][];
        initialiseTiles(3, 10);

        return {
            data: data,
            setBlock: setBlock,
            clearBlock: clearBlock
        };

        function initialiseTiles(height:number, width:number) {
            data = [];

            for (var i:number = 0; i < height; i++) {
                data[i] = [];

                for (var j:number = 0; j < width; j++) {
                    data[i][j] = {
                        color: '#fff'
                    };
                }
            }
        }

        function setBlock(row:number, block:Block) {
            for (var i:number = block.start; i < block.start + block.duration; i++) {
                data[row][i].color = block.color;
            }
        }

        function clearBlock(row:number, block:Block) {
            for (var i:number = block.start; i < block.start + block.duration; i++) {
                data[row][i].color = '#fff';
            }
        }
    }
})();

