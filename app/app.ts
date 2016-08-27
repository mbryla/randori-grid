(function () {
    'use strict';
    angular.module('app', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider:Object):void {
        }])
        .run(['bootloader', function (bootloader):void {
            bootloader.run();
        }]);
})();