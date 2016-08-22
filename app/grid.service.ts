(function () {
    'use strict';

    angular.module('app').service('gridService', gridService);

    gridService.$inject = [];

    function gridService() {

        interface Block {
            id:number,
            row:number,
            start:number,
            length:number,
            color:string
        }

        interface Tile {
            block:Block,
            first:boolean,
            color:string,
            striped:boolean
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
                        block: undefined,
                        first: false,
                        color: '#fff',
                        striped: false
                    };
                }
            }
        }

        function setBlock(row:number, block:Block, moving:boolean) {
            for (var i:number = block.start; i < block.start + block.length; i++) {
                if (i === block.start) {
                    data[row][i].first = true;
                }

                data[row][i].color = block.color;
                data[row][i].block = block;
                data[row][i].striped = moving;
            }
        }

        function clearBlock(row:number, block:Block) {
            for (var i:number = block.start; i < block.start + block.length; i++) {
                data[row][i].color = '#fff';
                data[row][i].block = undefined;
                data[row][i].striped = false;
                data[row][i].first = false;
            }
        }
    }
})();

