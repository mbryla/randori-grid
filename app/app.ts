(function () {
    'use strict';
    angular.module('app', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider:Object):void {
        }])
        .run(['bootloader', function (bootloader:Object):void {
            bootloader.run();
        }]);
})();