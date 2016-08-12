(function(){

    var webpack = require('webpack');
    var StatsPlugin = require("stats-webpack-plugin");
    var precss = require('precss');
    var autoprefixer = require('autoprefixer');

    var isProduction = process.env.NODE_ENV == 'production';

    var excludeFromStats = [
        /node_modules[\\\/](react|react-(?:hot-api|router|dom|dnd)|lodash.*|core-js|history|fbjs|sockjs-client|bootstrap-sass|dnd-core)[\\\/]/
    ];

    console.log(isProduction ? 'PRODUCTION BUILD' : 'DEVELOPMENT HMR');

    module.exports = {
        debug: !isProduction,
        devtool: isProduction ? '#source-map' : 'eval', // also could be 'cheap-eval-source-map'
        entry: {
            'js/index.js': [
                './web/js/index.js',
                './web/index.html'
            ]
        },
        output: {
            path: __dirname + '/build/web',
            publicPath: '/',
            sourcePrefix: '',
            filename: '[name]' + (isProduction ? '?[chunkhash]' : ''),
            chunkFilename: isProduction ? 'js/[name]?[chunkhash]' : '[id]',
            pathinfo: isProduction
        },
        plugins: (isProduction ? [
            //TODO Add Uglify
            new StatsPlugin('../webpack-build-statistics.json', {chunkModules: true, exclude: excludeFromStats})
        ] : [
            new webpack.NoErrorsPlugin()
        ]).concat([
            new webpack.DefinePlugin({"process.env": {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}})
        ]),
        resolve: {
            extensions: ['', '.json', '.js', '.jsx', '.css', '.less']
        },
        module: {
            loaders: [
                {test: /\.js$/, loaders: (isProduction ? [] : ['react-hot']).concat(['babel?cacheDirectory']), exclude: /node_modules|bower_components/}, // jsx?harmony&stripTypes
                {test: /\.json$/, loader: 'json'},
                {test: /\.css$/, loader: 'style!css?sourceMap!postcss'},
                {test: /\.less$/, loader: 'style!css?sourceMap!postcss!less?strictMath&sourceMap'},
                {test: /\.(?:woff|woff2|png|jpg|jpeg|gif|svg)$/, loader: 'url?limit=10000'},
                {test: /\.(?:ttf|eot)$/, loader: 'file'},
                {test: /\.html$/, loader: 'file?name=[name].[ext]'}
            ]
        },
        postcss: function() {
            return [precss, autoprefixer];
        },
        devServer: {
            contentBase: __dirname + '/web/',
            hot: true,
            inline: true,
            lazy: false,
            port: 8081,
            historyApiFallback: {
                index: 'index.html',
                rewrites: [
                    //{from: /\/soccer/, to: '/soccer.html'}
                ]
            },
            stats: {
                cached: false,
                colors: true,
                chunks: true,
                modules: true,
                timings: true,
                exclude: excludeFromStats
            }
        }
    };

})();