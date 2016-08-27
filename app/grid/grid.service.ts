(function () {
    'use strict';
    angular.module('app').service('gridService', gridService);

    gridService.$inject = [];
    function gridService():Object {

        var data:Tile[][] = [];

        return {
            data: data,
            initialize: initialize,
            setBlock: setBlock,
            clearBlock: clearBlock,
            setBlockDragged: setBlockDragged,
            setBlockResized: setBlockResized
        };

        function initialize(height:number, width:number):void {
            for (let i:number = 0; i < height; i++) {
                data[i] = [];

                for (let j:number = 0; j < width; j++) {
                    data[i][j] = {
                        block: undefined,
                        first: false,
                        color: '#fff',
                        striped: false
                    };
                }
            }
        }

        function setBlockResized(row:number, block:Block):void {
            for (let i:number = block.start; i < block.start + block.length; i++) {
                if (i === block.start) {
                    data[row][i].first = true;
                }

                data[row][i].color = block.color;
                data[row][i].block = block;
                data[row][i].striped = true;
            }

            data[row][block.start].striped = false;
            data[row][block.start + block.length - 1].striped = false;
        }

        function setBlockDragged(row:number, block:Block):void {
            for (let i:number = block.start; i < block.start + block.length; i++) {
                if (i === block.start) {
                    data[row][i].first = true;
                }

                data[row][i].color = block.color;
                data[row][i].block = block;
                data[row][i].striped = true;
            }
        }

        function setBlock(row:number, block:Block):void {
            for (let i:number = block.start; i < block.start + block.length; i++) {
                if (i === block.start) {
                    data[row][i].first = true;
                }

                data[row][i].color = block.color;
                data[row][i].block = block;
                data[row][i].striped = false;
            }
        }

        function clearBlock(row:number, block:Block):void {
            for (let i:number = block.start; i < block.start + block.length; i++) {
                data[row][i].color = '#fff';
                data[row][i].block = undefined;
                data[row][i].striped = false;
                data[row][i].first = false;
            }
        }
    }
})();

