(function () {
    'use strict';
    angular.module('app').service('dragService', dragService);

    dragService.$inject = ['gridService', 'pubSubService'];
    function dragService(gridService, pubSubService):Object {

        var draggedBlock:Block;
        var dragStartTile:number;
        var dragStartRow:number;
        var dragOffset:number;
        var dragRow:number;

        return {
            tileEntered: tileEntered,
            tilePressed: tilePressed,
            mouseReleased: mouseReleased
        };

        function tileEntered(row:number, tile:number):void {
            if ((draggedBlock !== undefined) && canBePlaced(row, tile + dragOffset)) {
                gridService.clearBlock(dragRow, draggedBlock);
                draggedBlock.start = tile + dragOffset;
                dragRow = row;
                gridService.setBlockDragged(dragRow, draggedBlock);
            }
        }

        function tilePressed(row:number, tile:number):void {
            let block:Block = gridService.data[row][tile].block;
            if (block !== undefined) {
                gridService.setBlockDragged(row, block);
                markDragStart(row, tile, block);
            }
        }

        function mouseReleased():void {
            if (draggedBlock !== undefined) {
                gridService.setBlock(dragRow, draggedBlock);
                if (blockMoved()) {
                    pubSubService.publish('block-modified', draggedBlock);
                }
                clearDrag();
            }
        }

        function canBePlaced(row:number, tile:number):boolean {
            return withinRow(row, tile) && !collides(row, tile);
        }

        function withinRow(row:number, tile:number):boolean {
            return (tile >= 0) && (tile + draggedBlock.length <= gridService.data[row].length);
        }

        function collides(row:number, tile:number):boolean {
            for (let i:number = tile; i < tile + draggedBlock.length; i++) {
                if (gridService.data[row][i].block && (gridService.data[row][i].block.id !== draggedBlock.id)) {
                    return true;
                }
            }
            return false;
        }

        function blockMoved():boolean {
            return (dragRow !== dragStartRow) || (draggedBlock.start !== dragStartTile);
        }

        function markDragStart(row:number, tile:number, block:Block):void {
            draggedBlock = block;
            dragStartTile = block.start;
            dragStartRow = row;
            dragOffset = block.start - tile;
            dragRow = row;
        }

        function clearDrag():void {
            draggedBlock = undefined;
            dragStartTile = undefined;
            dragStartRow = undefined;
            dragOffset = undefined;
            dragRow = undefined;
        }
    }
})();

