(function () {
    'use strict';
    angular.module('app').service('pubSubService', pubSubService);

    pubSubService.$inject = [];
    function pubSubService():Object {

        var data:Object = {};

        return {
            subscribe: subscribe,
            publish: publish
        };

        function subscribe(topic:string, callback:Function) {
            if (!data.hasOwnProperty(topic)) {
                data[topic] = [callback];
            } else {
                data[topic].push(callback);
            }
        }

        function publish(topic:string, payload:Object) {
            let callbacks:Function[] = data[topic];
            if (callbacks !== undefined) {
                for (let i:number = callbacks.length - 1; i >= 0; i--) {
                    callbacks[i](payload);
                }
            }
        }
    }
})();

