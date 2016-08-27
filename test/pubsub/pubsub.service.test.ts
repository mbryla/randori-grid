describe('pubSubService', function () {
    var pubSubService;
    var callbacks = [];

    beforeEach(module('app'));
    beforeEach(function () {
        inject(function ($injector) {
            pubSubService = $injector.get('pubSubService');
        });

        callbacks[0] = jasmine.createSpy('callback0');
        callbacks[1] = jasmine.createSpy('callback1');
    });

    it('should have a defined environment', function () {
        expect(pubSubService).toBeDefined();
        expect(callbacks[0]).toBeDefined();
        expect(callbacks[1]).toBeDefined();
    });

    describe('with callback0 on "topic"', function () {
        beforeEach(function () {
            pubSubService.subscribe('topic', callbacks[0]);
        });

        it('should execute callback0 3 times for 3 publish calls', function () {
            pubSubService.publish('topic', {data: 1});
            pubSubService.publish('topic', {data: 2});
            pubSubService.publish('topic', {data: 3});
            expect(callbacks[0]).toHaveBeenCalledWith({data: 1});
            expect(callbacks[0]).toHaveBeenCalledWith({data: 2});
            expect(callbacks[0]).toHaveBeenCalledWith({data: 3});
        });
    });

    describe('with callback0 and callback1 on "topic"', function () {
        beforeEach(function () {
            pubSubService.subscribe('topic', callbacks[0]);
            pubSubService.subscribe('topic', callbacks[1]);
        });

        describe('on "topic" publish of {data: 2}', function () {
            beforeEach(function () {
                pubSubService.publish('topic', {data: 2});
            });

            it('should execute callback0 with {data: 2}', function () {
                expect(callbacks[0]).toHaveBeenCalledWith({data: 2});
            });

            it('should execute callback0 with {data: 2}', function () {
                expect(callbacks[1]).toHaveBeenCalledWith({data: 2});
            });
        });
    });

    describe('with callback0 on "topic0" and callback1 on "topic1" topics', function () {
        beforeEach(function () {
            pubSubService.subscribe('topic0', callbacks[0]);
            pubSubService.subscribe('topic1', callbacks[1]);
        });

        describe('on "topic0" publish of {data: 4}', function () {
            beforeEach(function () {
                pubSubService.publish('topic0', {data: 4});
            });

            it('should execute callback0 with {data: 4}', function () {
                expect(callbacks[0]).toHaveBeenCalledWith({data: 4});
            });

            it('should not execute callback1', function () {
                expect(callbacks[1]).not.toHaveBeenCalled();
            });
        });

        describe('on "topic1" publish of {data: 3}', function () {
            beforeEach(function () {
                pubSubService.publish('topic1', {data: 3});
            });

            it('should execute callback1 with {data: 3}', function () {
                expect(callbacks[1]).toHaveBeenCalledWith({data: 3});
            });

            it('should not execute callback0', function () {
                expect(callbacks[0]).not.toHaveBeenCalled();
            });
        });
    });
});