module.exports = function(config) {

    config.set({

        basePath: '../src',

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        autoWatch: false,

        files: [
            'vendor/jquery/dist/jquery.min.js',
            'vendor/angular/angular.min.js',
            'vendor/angular-mocks/angular-mocks.js',

            'app/**/*.js'
        ]

    });

}