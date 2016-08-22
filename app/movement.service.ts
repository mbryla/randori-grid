(function () {
    'use strict';

    angular.module('app').service('movementService', movementService);

    movementService.$inject = ['gridService'];

    function movementService(gridService) {

        var draggedBlock;
        var dragStartTile;
        var dragStartRow;
        var dragOffset;
        var dragRow;

        return {
            tileEntered: tileEntered,
            tilePressed: tilePressed,
            mouseReleased: mouseReleased
        };

        function tileEntered(row, tile) {
            if ((draggedBlock !== undefined) && canBePlaced(row, tile + dragOffset)) {
                gridService.clearBlock(dragRow, draggedBlock);
                draggedBlock.start = tile + dragOffset;
                dragRow = row;
                gridService.setBlock(dragRow, draggedBlock, true);
            }
        }

        function tilePressed(row, tile) {
            var block = gridService.data[row][tile].block;
            if (block !== undefined) {
                gridService.setBlock(row, block, true);
                markDragStart(row, tile, block);
            }
        }

        function mouseReleased() {
            if (draggedBlock !== undefined) {
                gridService.setBlock(dragRow, draggedBlock, false);
                if (blockMoved()) {
                    console.log('block moved');
                }
                clearDrag();
            }
        }

        function canBePlaced(row, tile):boolean {
            return withinRow(row, tile) && !collides(row, tile);
        }

        function withinRow(row, tile):boolean {
            return (tile >= 0) && (tile + draggedBlock.length <= gridService.data[row].length);
        }

        function collides(row, tile):boolean {
            for (var i:number = tile; i < tile + draggedBlock.length; i++) {
                if (gridService.data[row][i].block && (gridService.data[row][i].block.id !== draggedBlock.id)) {
                    return true;
                }
            }
            return false;
        }

        function blockMoved() {
            return (dragRow !== dragStartRow) || (draggedBlock.start !== dragStartTile);
        }

        function markDragStart(row, tile, block):void {
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

