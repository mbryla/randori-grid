describe('dragService', function () {
    var dragService;
    var gridService;
    var pubSubService;
    var blockModifiedCallback;

    beforeEach(module('app'));
    beforeEach(function () {
        inject(function ($injector) {
            dragService = $injector.get('dragService');
            gridService = $injector.get('gridService');
            pubSubService = $injector.get('pubSubService');
        });

        gridService.initialize(3, 8);
        blockModifiedCallback = jasmine.createSpy('block-modified');
        pubSubService.subscribe('block-modified', blockModifiedCallback);
    });

    it('should have a defined environment', function () {
        expect(dragService).toBeDefined();
        expect(gridService).toBeDefined();
        expect(pubSubService).toBeDefined();
        expect(blockModifiedCallback).toBeDefined();
    });

    it('when dragging simple block on row 0', function () {
        beforeEach(function() {
            gridService.setBlock(0, block(2, 3));
        });

        describe('without offset', function() {
            beforeEach(function() {
                gridService.tilePressed(0, 2);
            });

            it('should allow to drag one tile left', function () {
                dragService.tileEntered(0, 1);
                dragService.mouseReleased();
                expectDraggedTo(1);
            });

            it('should allow to drag two tiles left', function() {
                dragService.tileEntered(0, 0);
                dragService.mouseReleased();
                expectDraggedTo(0);
            });

            it('should allow to drag one right left', function () {
                dragService.tileEntered(0, 3);
                dragService.mouseReleased();
                expectDraggedTo(3);
            });

            it('should allow to drag two tiles left', function() {
                dragService.tileEntered(0, 4);
                dragService.mouseReleased();
                expectDraggedTo(4);
            });
        });

        describe('with offset', function() {
            beforeEach(function() {
               gridService.tilePressed(0, 3);
            });

            it('should allow to drag one tile left', function () {
                dragService.tileEntered(0, 2);
                dragService.mouseReleased();
                expectDraggedTo(1);
            });

            it('should allow to drag two tiles left', function() {
                dragService.tileEntered(0, 1);
                dragService.mouseReleased();
                expectDraggedTo(0);
            });

            it('should allow to drag one right left', function () {
                dragService.tileEntered(0, 4);
                dragService.mouseReleased();
                expectDraggedTo(3);
            });

            it('should allow to drag two tiles left', function() {
                dragService.tileEntered(0, 5);
                dragService.mouseReleased();
                expectDraggedTo(4);
            });

            it('should not allow to drag left outside grid', function() {
                dragService.tileEntered(0, 0);
                dragService.mouseReleased();
                expectNotDragged();
            });

            it('should not allow to drag right outside grid', function() {
                dragService.tileEntered(0, 9);
                dragService.mouseReleased();
                expectNotDragged();
            });
        });
    });

    function expectDraggedTo(start) {
        expect(blockModifiedCallback.calls.count()).toEqual(1);
        expect(blockModifiedCallback.calls.mostRecent().args[0].start).toBe(start);
    }

    function expectNotDragged() {
        expect(blockModifiedCallback.calls.count()).toEqual(0);
    }

    function block(start, length) {
        return {
            color: '#ffffff',
            start: start,
            length: length,
            row: 0,
            id: 0
        }
    }
});