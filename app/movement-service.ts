(function () {
    'use strict';

    angular.module('app').service('movementService', movementService);

    movementService.$inject = [];

    function movementService() {

        return {
            test: test
        };

        function test(){
            console.log("lololol :)");
        }

    }
})();

