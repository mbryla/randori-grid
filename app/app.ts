(function () {
    'use strict';
    angular.module('app', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
        }])
        .run(['bootloader', function (bootloader) {
            bootloader.run();
        }]);
})();