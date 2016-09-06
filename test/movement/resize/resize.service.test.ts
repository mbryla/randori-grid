describe('resizeService', function () {
    var resizeService;
    var gridService;
    var pubSubService;

    var mockedBlockId = 0;
    var blockCreatedCallback;
    var blockModifiedCallback;

    beforeEach(module('app'));
    beforeEach(function () {
        inject(function ($injector) {
            resizeService = $injector.get('resizeService');
            gridService = $injector.get('gridService');
            pubSubService = $injector.get('pubSubService');
        });

        gridService.initialize(3, 10);
        blockCreatedCallback = jasmine.createSpy('block-created');
        blockModifiedCallback = jasmine.createSpy('block-modified');
        pubSubService.subscribe('block-created', blockCreatedCallback);
        pubSubService.subscribe('block-modified', blockModifiedCallback);
    });

    it('should have a defined environment', function () {
        expect(resizeService).toBeDefined();
        expect(gridService).toBeDefined();
        expect(pubSubService).toBeDefined();
        expect(blockModifiedCallback).toBeDefined();
    });

    describe('when creating new block in row 0', function () {
        beforeEach(function () {
            resizeService.tilePressedWithControl(0, 5);
        });

        it('should allow to set length to 1', function () {
            resizeService.mouseReleased();
            expectCreatedAt(5, 1);
        });

        describe('left', function () {
            it('should allow to set length to 2', function () {
                resizeService.tileEntered(4);
                resizeService.mouseReleased();
                expectCreatedAt(4, 2);
            });

            it('should allow to set length to 3', function () {
                resizeService.tileEntered(3);
                resizeService.mouseReleased();
                expectCreatedAt(3, 3);
            });

            it('should not allow to change direction', function () {
                resizeService.tileEntered(4);
                resizeService.tileEntered(6);
                resizeService.mouseReleased();
                expectCreatedAt(4, 2);
            });

            it('should not allow to overlap adjacent block', function () {
                gridService.setBlock(block(3, 2));
                resizeService.tileEntered(4);
                resizeService.mouseReleased();
                expectCreatedAt(5, 1);
            });

            it('should not allow to overlap block 1 tile away', function () {
                gridService.setBlock(block(2, 2));
                resizeService.tileEntered(3);
                resizeService.mouseReleased();
                expectCreatedAt(5, 1);
            });

            it('should not allow to surround block', function () {
                gridService.setBlock(block(3, 2));
                resizeService.tileEntered(2);
                resizeService.mouseReleased();
                expectCreatedAt(5, 1);
            });
        });

        describe('right', function () {
            it('should allow to set length to 2', function () {
                resizeService.tileEntered(6);
                resizeService.mouseReleased();
                expectCreatedAt(5, 2);
            });

            it('should allow to set length to 3', function () {
                resizeService.tileEntered(7);
                resizeService.mouseReleased();
                expectCreatedAt(5, 3);
            });

            it('should not allow to change direction', function () {
                resizeService.tileEntered(6);
                resizeService.tileEntered(4);
                resizeService.mouseReleased();
                expectCreatedAt(5, 2);
            });

            it('should not allow to overlap adjacent block', function () {
                gridService.setBlock(block(6, 2));
                resizeService.tileEntered(6);
                resizeService.mouseReleased();
                expectCreatedAt(5, 1);
            });

            it('should not allow to overlap block 1 tile away', function () {
                gridService.setBlock(block(7, 2));
                resizeService.tileEntered(7);
                resizeService.mouseReleased();
                expectCreatedAt(5, 1);
            });

            it('should not allow to surround block', function () {
                gridService.setBlock(block(6, 2));
                resizeService.tileEntered(8);
                resizeService.mouseReleased();
                expectCreatedAt(5, 1);
            });
        });
    });

    describe('when resizing simple block in row 0', function () {
        beforeEach(function () {
            gridService.setBlock(block(2, 3));
        });

        describe('should not allow to resize from within the block', function () {
            beforeEach(function () {
                resizeService.tilePressedWithControl(0, 3);
            });

            it('1 tile left', function () {
                resizeService.tileEntered(1);
                resizeService.mouseReleased();
                expectNotResized();
            });

            it('1 tile right', function () {
                resizeService.tileEntered(5);
                resizeService.mouseReleased();
                expectNotResized();
            });
        });

        describe('left', function () {
            beforeEach(function () {
                resizeService.tilePressedWithControl(0, 2);
            });

            it('should allow to increase length by 1 tile', function () {
                resizeService.tileEntered(1);
                resizeService.mouseReleased();
                expectResizedTo(1, 4);
            });

            it('should allow to decrease length by 1 tile', function () {
                resizeService.tileEntered(3);
                resizeService.mouseReleased();
                expectResizedTo(3, 2);
            });

            it('should allow to increase length by 2 tiles', function () {
                resizeService.tileEntered(0);
                resizeService.mouseReleased();
                expectResizedTo(0, 5);
            });

            it('should allow to decrease length by 2 tiles', function () {
                resizeService.tileEntered(4);
                resizeService.mouseReleased();
                expectResizedTo(4, 1);
            });

            it('should not allow to decrease length below 0', function () {
                resizeService.tileEntered(5);
                resizeService.mouseReleased();
                expectNotResized();
            });

            it('should not allow to increase into adjacent block', function () {
                gridService.setBlock(block(0, 2));
                resizeService.tileEntered(1);
                resizeService.mouseReleased();
                expectNotResized();
            });

            it('should not allow to increase into another block 1 tile away', function () {
                gridService.setBlock(block(0, 1));
                resizeService.tileEntered(0);
                resizeService.mouseReleased();
                expectNotResized();
            });

            it('should not allow to increase over adjacent block', function () {
                gridService.setBlock(block(1, 1));
                resizeService.tileEntered(0);
                resizeService.mouseReleased();
                expectNotResized();
            });
        });

        describe('right', function () {
            beforeEach(function () {
                resizeService.tilePressedWithControl(0, 4);
            });

            it('should allow to increase length by 1 tile', function () {
                resizeService.tileEntered(5);
                resizeService.mouseReleased();
                expectResizedTo(2, 4);

            });

            it('should allow to decrease length by 1 tile', function () {
                resizeService.tileEntered(3);
                resizeService.mouseReleased();
                expectResizedTo(2, 2);
            });

            it('should allow to increase length by 2 tiles', function () {
                resizeService.tileEntered(6);
                resizeService.mouseReleased();
                expectResizedTo(2, 5);
            });

            it('should allow to decrease length by 2 tiles', function () {
                resizeService.tileEntered(2);
                resizeService.mouseReleased();
                expectResizedTo(2, 1);
            });

            it('should not allow to decrease length below 0', function () {
                resizeService.tileEntered(1);
                resizeService.mouseReleased();
                expectNotResized();
            });

            it('should not allowed to increase into adjacent block', function () {
                gridService.setBlock(block(5, 2));
                resizeService.tileEntered(5);
                resizeService.mouseReleased();
                expectNotResized();
            });

            it('should not allow to increase into another block 1 tile away', function () {
                gridService.setBlock(block(6, 1));
                resizeService.tileEntered(6);
                resizeService.mouseReleased();
                expectNotResized();
            });

            it('should not allow to increase over adjacent block', function () {
                gridService.setBlock(block(5, 1));
                resizeService.tileEntered(6);
                resizeService.mouseReleased();
                expectNotResized();
            });
        });
    });

    function expectCreatedAt(start, length) {
        expect(blockCreatedCallback.calls.count()).toEqual(1);
        expect(blockCreatedCallback.calls.mostRecent().args[0].start).toBe(start);
        expect(blockCreatedCallback.calls.mostRecent().args[0].length).toBe(length);
    }

    function expectResizedTo(start, length) {
        expect(blockModifiedCallback.calls.count()).toEqual(1);
        expect(blockModifiedCallback.calls.mostRecent().args[0].start).toBe(start);
        expect(blockModifiedCallback.calls.mostRecent().args[0].length).toBe(length);
    }

    function expectNotResized() {
        expect(blockModifiedCallback.calls.count()).toEqual(0);
    }

    function block(start, length) {
        return {
            color: '#ffffff',
            start: start,
            length: length,
            row: 0,
            id: mockedBlockId++
        }
    }
});