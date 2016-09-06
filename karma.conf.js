module.exports = function(config) {
    config.set({
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'app/**/*.js',
            'test/**/*.js'
        ],
        frameworks: ['jasmine'],
        browsers: ['Chrome']
    });
};