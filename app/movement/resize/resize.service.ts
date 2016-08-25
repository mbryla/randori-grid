(function () {
    'use strict';
    angular.module('app').service('resizeService', resizeService);

    resizeService.$inject = ['gridService'];
    function resizeService(gridService) {
        var resizedBlock;
        var resizeStartTile;
        var resizeRow;
        var resizingLeft;
        var resizingRight;

        return {
            tileEntered: tileEntered,
            tilePressedWithControl: tilePressedWithControl,
            mouseReleased: mouseReleased
        };

        function tileEntered(tile):void {
            if ((resizedBlock !== undefined) && (resizingLeft || resizingRight)) {
                if (resizingLeft && resizingRight) {
                    // choose which side to resize
                    resizingLeft = tile < resizedBlock.start;
                    resizingRight = tile > resizedBlock.start;
                }
                resizingLeft ? resizeLeft(tile) : resizeRight(tile);
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
                }
            } else {
                resizingLeft = true;
                resizingRight = true;
                resizedBlock = {
                    color: 'bafe24',
                    start: tile,
                    length: 1,
                    id: undefined
                };

                gridService.setBlockResized(row, resizedBlock);
                markResizeStart(row, tile, resizedBlock);
            }
        }

        function mouseReleased():void {
            if (resizedBlock !== undefined) {
                gridService.setBlock(resizeRow, resizedBlock);
                if (creatingNewBlock()) {
                    console.log('block created');
                } else if (blockResized()) {
                    console.log('block resized');
                }
                clearResize();
            }
        }

        function resizeLeft(tile) {
            let offset = tile - resizedBlock.start;
            if ((offset > 0) && (offset < resizedBlock.length)) {
                gridService.clearBlock(resizeRow, resizedBlock);
                resizedBlock.start = tile;
                resizedBlock.length = resizedBlock.length - offset;
                gridService.setBlockResized(resizeRow, resizedBlock);
            } else if ((offset < 0) && canBeExpandedBySection(tile, resizedBlock.start - 1)) {
                gridService.clearBlock(resizeRow, resizedBlock);
                resizedBlock.start = tile;
                resizedBlock.length = resizedBlock.length - offset;
                gridService.setBlockResized(resizeRow, resizedBlock);
            }
        }

        function resizeRight(tile) {
            let offset = tile - (resizedBlock.start + resizedBlock.length - 1);
            if ((offset > 0) && canBeExpandedBySection(resizedBlock.start + resizedBlock.length, tile)) {
                gridService.clearBlock(resizeRow, resizedBlock);
                resizedBlock.length = resizedBlock.length + offset;
                gridService.setBlockResized(resizeRow, resizedBlock);
            } else if ((offset < 0) && (resizedBlock.length > 1)) {
                gridService.clearBlock(resizeRow, resizedBlock);
                resizedBlock.length = resizedBlock.length + offset;
                gridService.setBlockResized(resizeRow, resizedBlock);
            }
        }

        function canBeExpandedBySection(from:number, to:number) {
            for (let i:number = from; i <= to; i++) {
                if (gridService.data[resizeRow][i].block !== undefined) {
                    return false;
                }
            }
            return true;
        }

        function creatingNewBlock():boolean {
            return resizedBlock.id === undefined;
        }

        function blockResized():boolean {
            return (resizingLeft && (resizedBlock.start != resizeStartTile)) || (resizingRight && (resizedBlock.start + resizedBlock.length + 1));
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

