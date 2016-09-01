describe('dragService', function () {
    var resizeService;
    var gridService;
    var pubSubService;

    var mockedBlockId = 0;
    var blockModifiedCallback;

    beforeEach(module('app'));
    beforeEach(function () {
        inject(function ($injector) {
            resizeService = $injector.get('resizeService');
            gridService = $injector.get('gridService');
            pubSubService = $injector.get('pubSubService');
        });

        gridService.initialize(3, 10);
        blockModifiedCallback = jasmine.createSpy('block-modified');
        pubSubService.subscribe('block-modified', blockModifiedCallback);
    });

    // todo should not allow to resize into blocks!!!
    // todo should not allow to resize over blocks!!!
    // todo shoould allow to create blocks
        // todo but not into other blocks
        // todo but not over blocks
    
    // todo with one it should not allow to change resize directions?
    
    it('should have a defined environment', function () {
        expect(resizeService).toBeDefined();
        expect(gridService).toBeDefined();
        expect(pubSubService).toBeDefined();
        expect(blockModifiedCallback).toBeDefined();
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

            it('should not allow to decrease length below 0', function() {
                resizeService.tileEntered(5);
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

            it('should not allow to decrease length below 0', function() {
                resizeService.tileEntered(1);
                resizeService.mouseReleased();
                expectNotResized();
            });
        });
    });

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