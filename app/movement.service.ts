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

        var resizedBlock;
        var resizeStartTile;
        var resizeRow;
        var resizingLeft;
        var resizingRight;

        return {
            tileEntered: tileEntered,
            tilePressed: tilePressed,
            tilePressedWithControl: tilePressedWithControl,
            mouseReleased: mouseReleased
        };

        function tileEntered(row, tile):void {
            if ((draggedBlock !== undefined) && canBePlaced(row, tile + dragOffset)) {
                gridService.clearBlock(dragRow, draggedBlock);
                draggedBlock.start = tile + dragOffset;
                dragRow = row;
                gridService.setBlockDragged(dragRow, draggedBlock);
            } else if ((resizedBlock !== undefined)) {
                if(resizingLeft && resizingRight) {
                    resizingLeft = tile < resizedBlock.start;
                    resizingRight = tile > resizedBlock.start;
                }

                if (resizingLeft) {
                    let offset = tile - resizedBlock.start;
                    console.log('resizing left by offset:', offset);
                    if ((offset > 0) && (offset < resizedBlock.length)) {
                        gridService.clearBlock(resizeRow, resizedBlock);
                        resizedBlock.start = tile;
                        resizedBlock.length = resizedBlock.length - offset;
                        gridService.setBlockResized(resizeRow, resizedBlock);
                    } else if (offset < 0) {
                        for (let i = tile; i < resizedBlock.start; i++) {
                            if (gridService.data[resizeRow][i].block !== undefined) {
                                return;
                            }
                        }

                        gridService.clearBlock(resizeRow, resizedBlock);
                        resizedBlock.start = tile;
                        resizedBlock.length = resizedBlock.length - offset;
                        gridService.setBlockResized(resizeRow, resizedBlock);
                    }
                }
                if (resizingRight) {
                    let offset = tile - (resizedBlock.start + resizedBlock.length - 1);
                    console.log('resizing right by offset:', offset);
                    if (offset > 0) {
                        for (let i = resizedBlock.start + resizedBlock.length; i <= tile; i++) {
                            if (gridService.data[resizeRow][i].block !== undefined) {
                                return;
                            }
                        }

                        gridService.clearBlock(resizeRow, resizedBlock);
                        resizedBlock.length = resizedBlock.length + offset;
                        gridService.setBlockResized(resizeRow, resizedBlock);
                    } else if ((offset < 0) && (resizedBlock.length > 1)) {
                        console.log('resizing right to the left. offset:', offset, 'length:', resizedBlock.length);
                        gridService.clearBlock(resizeRow, resizedBlock);
                        resizedBlock.length = resizedBlock.length + offset;
                        gridService.setBlockResized(resizeRow, resizedBlock);
                    }
                }
            }
        }

        function tilePressed(row, tile):void {
            let block = gridService.data[row][tile].block;
            if (block !== undefined) {
                gridService.setBlockDragged(row, block);
                markDragStart(row, tile, block);
            }
        }

        function tilePressedWithControl(row, tile):void {
            let block = gridService.data[row][tile].block;
            if (block !== undefined) {
                resizingLeft = (tile == block.start);
                resizingRight = (tile == block.start + block.length - 1);

                if (resizingLeft || resizingRight) {
                    gridService.setBlockResized(row, block);
                    markResizeStart(row, tile, block);
                    console.log('resizing left:', resizingLeft, ', resizing right:', resizingRight);
                }
            }
        }

        function mouseReleased():void {
            if (draggedBlock !== undefined) {
                gridService.setBlock(dragRow, draggedBlock);
                if (blockMoved()) {
                    console.log('block moved');
                }
                clearDrag();
            } else if (resizedBlock !== undefined) {
                gridService.setBlock(resizeRow, resizedBlock);
                if (blockResized()) {
                    console.log('block resized');
                }
                clearResize();
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

        function blockMoved():boolean {
            return (dragRow !== dragStartRow) || (draggedBlock.start !== dragStartTile);
        }

        function blockResized():boolean {
            return (resizingLeft && (resizedBlock.start != resizeStartTile)) || (resizingRight && (resizedBlock.start + resizedBlock.length + 1));
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

        function markResizeStart(row, tile, block):void {
            resizedBlock = block;
            resizeStartTile = tile;
            resizeRow = row;
        }

        function clearResize():void {
            resizedBlock = undefined;
            resizeStartTile = undefined;
            resizeRow = undefined;
            resizingLeft = undefined;
            resizingRight = undefined;
        }
    }
})();

