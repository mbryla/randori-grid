describe('movementService', function () {
    var movementService;
    var dragService;
    var resizeService;

    beforeEach(module('app'));
    beforeEach(function () {
        inject(function ($injector) {
            movementService = $injector.get('movementService');
            dragService = $injector.get('dragService');
            resizeService = $injector.get('resizeService');
        });

        spyOn(dragService, 'tileEntered');
        spyOn(dragService, 'tilePressed');
        spyOn(dragService, 'mouseReleased');

        spyOn(resizeService, 'tileEntered');
        spyOn(resizeService, 'tilePressedWithControl');
        spyOn(resizeService, 'mouseReleased');
    });

    it('should have a defined environment', function () {
        expect(movementService).toBeDefined();
        expect(dragService).toBeDefined();
        expect(resizeService).toBeDefined();
    });

    it('on tilePressed called with row 1 and tile 4 should call dragService.tilePressed with row 1 and tile 4', function () {
        movementService.tilePressed(1, 4);
        expect(dragService.tilePressed).toHaveBeenCalledWith(1, 4);
    });

    it('on tilePressedWithControl called with row 1 and tile 4 should call dragService.tilePressedWithControl with row 1 and tile 4', function () {
        movementService.tilePressedWithControl(1, 4);
        expect(resizeService.tilePressedWithControl).toHaveBeenCalledWith(1, 4);
    });

    describe('on tileEntered called with row 1 and tile 4', function () {
        beforeEach(function () {
            movementService.tileEntered(1, 4);
        });

        it('should call dragService.tileEntered with row 1 and tile 4', function () {
            expect(dragService.tileEntered).toHaveBeenCalledWith(1, 4);
        });

        it('should call resizeService.tileEntered with tile 4', function () {
            expect(resizeService.tileEntered).toHaveBeenCalledWith(4);
        });
    });

    describe('on mouseReleased called', function () {
        beforeEach(function () {
            movementService.mouseReleased();
        });

        it('should call dragService.mouseReleased', function () {
            expect(dragService.mouseReleased).toHaveBeenCalled();
        });

        it('should call resizeService.mouseReleased', function () {
            expect(resizeService.mouseReleased).toHaveBeenCalled();
        });
    });
});