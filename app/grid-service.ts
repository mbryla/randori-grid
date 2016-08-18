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
        initData(3, 10);

        return {
            data: data,
            setBlock: setBlock
        };

        function initData(height:number, width:number) {
            data = [];

            for (var i:number = 0; i < height; i++) {
                data[i] = [];

                for (var j:number = 0; j < width; j++) {
                    data[i][j] = {
                        color: 'white'
                    };
                }
            }
        }

        function setBlock(row:number, block:Block) {
            for (var i:number = block.start; i < block.start + block.duration; i++) {
                data[row][i].color = block.color;
            }
        }
    }
})();

