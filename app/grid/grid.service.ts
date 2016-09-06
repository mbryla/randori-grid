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
                        tag: undefined,
                        block: undefined,
                        first: false,
                        color: '#fff',
                        striped: false
                    };
                }
            }
        }

        function setBlockResized(block:Block):void {
            for (let i:number = block.start; i < block.start + block.length; i++) {
                if (i === block.start) {
                    data[block.row][i].first = true;
                }

                data[block.row][i].tag = block.tag;
                data[block.row][i].color = block.color;
                data[block.row][i].block = block;
                data[block.row][i].striped = true;
            }

            data[block.row][block.start].striped = false;
            data[block.row][block.start + block.length - 1].striped = false;
        }

        function setBlockDragged(block:Block):void {
            for (let i:number = block.start; i < block.start + block.length; i++) {
                if (i === block.start) {
                    data[block.row][i].first = true;
                }

                data[block.row][i].tag = block.tag;
                data[block.row][i].color = block.color;
                data[block.row][i].block = block;
                data[block.row][i].striped = true;
            }
        }

        function setBlock(block:Block):void {
            for (let i:number = block.start; i < block.start + block.length; i++) {
                if (i === block.start) {
                    data[block.row][i].first = true;
                }

                data[block.row][i].tag = block.tag;
                data[block.row][i].color = block.color;
                data[block.row][i].block = block;
                data[block.row][i].striped = false;
            }
        }

        function clearBlock(block:Block):void {
            for (let i:number = block.start; i < block.start + block.length; i++) {
                data[block.row][i].tag = undefined;
                data[block.row][i].color = '#fff';
                data[block.row][i].block = undefined;
                data[block.row][i].striped = false;
                data[block.row][i].first = false;
            }
        }
    }
})();

