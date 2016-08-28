describe('dragService', function () {
    var dragService;
    var gridService;
    var pubSubService;

    var mockedBlockId = 0;
    var blockModifiedCallback;

    beforeEach(module('app'));
    beforeEach(function () {
        inject(function ($injector) {
            dragService = $injector.get('dragService');
            gridService = $injector.get('gridService');
            pubSubService = $injector.get('pubSubService');
        });

        gridService.initialize(3, 10);
        blockModifiedCallback = jasmine.createSpy('block-modified');
        pubSubService.subscribe('block-modified', blockModifiedCallback);
    });

    it('should have a defined environment', function () {
        expect(dragService).toBeDefined();
        expect(gridService).toBeDefined();
        expect(pubSubService).toBeDefined();
        expect(blockModifiedCallback).toBeDefined();
    });

    describe('when dragging simple block from row 0', function () {
        beforeEach(function () {
            gridService.setBlock(block(0, 2, 3));
        });

        describe('to row 1', function() {
            describe('without grab offset', function() {
                beforeEach(function () {
                    dragService.tilePressed(0, 2);
                });

                it('should not recognize same place as drag', function() {
                    dragService.tileEntered(1, 2);
                    dragService.tileEntered(0, 2);
                    dragService.mouseReleased();
                    expectNotDragged();
                });

                it('should allow to drag to the same tile', function() {
                    dragService.tileEntered(1, 2);
                    dragService.mouseReleased();
                    expectDraggedTo(1, 2);
                });

                it('should allow to drag one tile left', function () {
                    dragService.tileEntered(1, 1);
                    dragService.mouseReleased();
                    expectDraggedTo(1, 1);
                });

                it('should allow to drag two tiles left', function () {
                    dragService.tileEntered(1, 0);
                    dragService.mouseReleased();
                    expectDraggedTo(1, 0);
                });

                it('should allow to drag one tile right', function () {
                    dragService.tileEntered(1, 3);
                    dragService.mouseReleased();
                    expectDraggedTo(1, 3);
                });

                it('should allow to drag two tiles right', function () {
                    dragService.tileEntered(1, 4);
                    dragService.mouseReleased();
                    expectDraggedTo(1, 4);
                });

                it('should not allow to drag right outside grid', function() {
                    dragService.tileEntered(0, 8);
                    dragService.mouseReleased();
                    expectNotDragged();
                });

                describe('should avoid collision', function () {
                    it('with block on the same tiles', function() {
                        gridService.setBlock(block(1, 0, 10));
                        dragService.tileEntered(1, 2);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });

                    it('with adjacent block', function () {
                        gridService.setBlock(block(1, 5, 2));
                        dragService.tileEntered(1, 3);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });

                    it('with other block two tiles away', function () {
                        gridService.setBlock(block(1, 6, 2));
                        dragService.tileEntered(1, 4);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });

                    it('when dragged into other tile', function () {
                        gridService.setBlock(block(1, 5, 5));
                        dragService.tileEntered(1, 6);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });
                });
            });

            describe('with grad offset of 1', function() {
                beforeEach(function () {
                    dragService.tilePressed(0, 3);
                });

                it('should not recognize same place as drag', function() {
                    dragService.tileEntered(1, 3);
                    dragService.tileEntered(0, 3);
                    dragService.mouseReleased();
                    expectNotDragged();
                });

                it('should allow to drag to the same tile', function() {
                    dragService.tileEntered(1, 3);
                    dragService.mouseReleased();
                    expectDraggedTo(1, 2);
                });

                it('should allow to drag one tile left', function () {
                    dragService.tileEntered(1, 2);
                    dragService.mouseReleased();
                    expectDraggedTo(1, 1);
                });

                it('should allow to drag two tiles left', function () {
                    dragService.tileEntered(1, 1);
                    dragService.mouseReleased();
                    expectDraggedTo(1, 0);
                });

                it('should allow to drag one right left', function () {
                    dragService.tileEntered(1, 4);
                    dragService.mouseReleased();
                    expectDraggedTo(1, 3);
                });

                it('should allow to drag two tiles left', function () {
                    dragService.tileEntered(1, 5);
                    dragService.mouseReleased();
                    expectDraggedTo(1, 4);
                });

                it('should not allow to drag left outside grid', function () {
                    dragService.tileEntered(1, 0);
                    dragService.mouseReleased();
                    expectNotDragged();
                });

                it('should not allow to drag right outside grid', function () {
                    dragService.tileEntered(1, 9);
                    dragService.mouseReleased();
                    expectNotDragged();
                });

                describe('should avoid collision', function() {
                    it('with block on the same tiles', function() {
                        gridService.setBlock(block(1, 0, 10));
                        dragService.tileEntered(1, 3);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });

                    it('with adjacent block', function () {
                        gridService.setBlock(block(1, 5, 2));
                        dragService.tileEntered(1, 4);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });

                    it('with other block two tiles away', function () {
                        gridService.setBlock(block(1, 6, 2));
                        dragService.tileEntered(1, 5);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });

                    it('when dragged into other tile', function () {
                        gridService.setBlock(block(1, 5, 5));
                        dragService.tileEntered(1, 7);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });
                });
            });
        });

        describe('within row 0', function () {
            describe('without grab offset', function () {
                beforeEach(function () {
                    dragService.tilePressed(0, 2);
                });

                it('should not recognize same place as drag', function() {
                    dragService.tileEntered(0, 1);
                    dragService.tileEntered(0, 2);
                    dragService.mouseReleased();
                    expectNotDragged();
                });

                it('should allow to drag one tile left', function () {
                    dragService.tileEntered(0, 1);
                    dragService.mouseReleased();
                    expectDraggedTo(0, 1);
                });

                it('should allow to drag two tiles left', function () {
                    dragService.tileEntered(0, 0);
                    dragService.mouseReleased();
                    expectDraggedTo(0, 0);
                });

                it('should allow to drag one tile right', function () {
                    dragService.tileEntered(0, 3);
                    dragService.mouseReleased();
                    expectDraggedTo(0, 3);
                });

                it('should allow to drag two tiles right', function () {
                    dragService.tileEntered(0, 4);
                    dragService.mouseReleased();
                    expectDraggedTo(0, 4);
                });

                it('should not allow to drag right outside grid', function() {
                    dragService.tileEntered(0, 8);
                    dragService.mouseReleased();
                    expectNotDragged();
                });

                describe('should avoid collision', function () {
                    it('with adjacent block', function () {
                        gridService.setBlock(block(0, 5, 2));
                        dragService.tileEntered(0, 3);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });

                    it('with other block two tiles away', function () {
                        gridService.setBlock(block(0, 6, 2));
                        dragService.tileEntered(0, 4);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });

                    it('when dragged into other tile', function () {
                        gridService.setBlock(block(0, 5, 5));
                        dragService.tileEntered(0, 6);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });
                });
            });

            describe('with grab offset of 1', function () {
                beforeEach(function () {
                    dragService.tilePressed(0, 3);
                });

                it('should not recognize same place as drag', function() {
                    dragService.tileEntered(0, 2);
                    dragService.tileEntered(0, 3);
                    dragService.mouseReleased();
                    expectNotDragged();
                });

                it('should allow to drag one tile left', function () {
                    dragService.tileEntered(0, 2);
                    dragService.mouseReleased();
                    expectDraggedTo(0, 1);
                });

                it('should allow to drag two tiles left', function () {
                    dragService.tileEntered(0, 1);
                    dragService.mouseReleased();
                    expectDraggedTo(0, 0);
                });

                it('should allow to drag one right left', function () {
                    dragService.tileEntered(0, 4);
                    dragService.mouseReleased();
                    expectDraggedTo(0, 3);
                });

                it('should allow to drag two tiles left', function () {
                    dragService.tileEntered(0, 5);
                    dragService.mouseReleased();
                    expectDraggedTo(0, 4);
                });

                it('should not allow to drag left outside grid', function () {
                    dragService.tileEntered(0, 0);
                    dragService.mouseReleased();
                    expectNotDragged();
                });

                it('should not allow to drag right outside grid', function () {
                    dragService.tileEntered(0, 9);
                    dragService.mouseReleased();
                    expectNotDragged();
                });

                describe('should avoid collision', function() {
                    it('with adjacent block', function () {
                        gridService.setBlock(block(0, 5, 2));
                        dragService.tileEntered(0, 4);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });

                    it('with other block two tiles away', function () {
                        gridService.setBlock(block(0, 6, 2));
                        dragService.tileEntered(0, 5);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });

                    it('when dragged into other tile', function () {
                        gridService.setBlock(block(0, 5, 5));
                        dragService.tileEntered(0, 7);
                        dragService.mouseReleased();
                        expectNotDragged();
                    });
                });
            });
        });
    });

    function expectDraggedTo(row, start) {
        expect(blockModifiedCallback.calls.count()).toEqual(1);
        expect(blockModifiedCallback.calls.mostRecent().args[0].start).toBe(start);
        expect(blockModifiedCallback.calls.mostRecent().args[0].row).toBe(row);
    }

    function expectNotDragged() {
        expect(blockModifiedCallback.calls.count()).toEqual(0);
    }

    function block(row, start, length) {
        return {
            color: '#ffffff',
            start: start,
            length: length,
            row: row,
            id: mockedBlockId++
        }
    }
});