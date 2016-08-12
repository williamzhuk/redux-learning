module.exports = function(config) {

    var webpackConfig = require('./webpack.config');

    delete webpackConfig.entry;
    webpackConfig.devtool = 'inline-source-map';

    config.set({

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },

        basePath: '.',

        frameworks: [
            'mocha',
            'chai',
            'sinon-chai'
        ],

        files: [
           require.resolve('babel-polyfill/dist/polyfill'),
            './test/glob.js'
        ],

        reporters: ['mocha', 'coverage'], // html

        htmlReporter: {
            outputDir: './build/karma'
        },

        coverageReporter: {
            type: 'lcov',
            dir: './build/karma'
        },

        logLevel: config.LOG_WARN,

        preprocessors: {
            './test/glob.js': ['webpack', 'sourcemap', 'coverage'],
            './src/**/*.js': ['coverage']
        },

        browsers: ['PhantomJS'],

        plugins: [
            'karma-chai-plugins',
            'karma-coverage',
            'karma-html-reporter',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader',
            'karma-webpack'
        ],

        client: {
            captureConsole: true,
            showDebugMessages: true,
            mocha: {
                ui: 'bdd',
                timeout: 5000
            }
        },

        singleRun: false,

        autoWatch: true

    });

};