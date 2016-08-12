var webpack = require('webpack');
var StatsPlugin = require("stats-webpack-plugin");
var isProduction = process.env.NODE_ENV == 'production';
var excludeFromStats = [
    /node_modules[\\\/]react?[\\\/]/,
    /node_modules[\\\/]react(-router|-dom|-redux)?[\\\/]/,
    /node_modules[\\\/]items-store[\\\/]/
];

console.log(isProduction ? 'PRODUCTION BUILD' : 'DEVELOPMENT HMR');

module.exports = {
    debug: !isProduction,
    devtool: isProduction ? '#source-map' : 'eval',
    entry: {
        'index.js': [
            './web/js/index.js',
            './web/index.html'
        ],
        //'router.js': './web/js/router'
    },
    output: {
        path: __dirname + '/build/web',
        publicPath: '/',
        sourcePrefix: '',
        filename: '[name]' + (isProduction ? '?[chunkhash]' : ''),
        chunkFilename: isProduction ? '[name]?[chunkhash]' : '[id]',
        pathinfo: isProduction
    },
    plugins: (isProduction ? [
        //TODO Add Uglify
        new StatsPlugin('../webpack-build-statistics.json', {chunkModules: true, exclude: excludeFromStats})
    ] : [
        new webpack.NoErrorsPlugin()
    ]).concat([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]),
    resolve: {
        extensions: ['', '.json', '.js', '.jsx', '.css', '.less']
    },
    module: {
        loaders: [
            {test: /\.js$/, loaders: (isProduction ? [] : ['react-hot']).concat(['babel']), exclude: /node_modules|bower_components/}, // jsx?harmony&stripTypes
            {test: /\.json$/, loader: 'json'},
            {test: /\.css$/, loader: 'style!css!autoprefixer'},
            {test: /\.less$/, loader: 'style!css!autoprefixer!less?strictMath'},
            {test: /\.(?:woff|woff2|png|jpg|jpeg|gif|svg)$/, loader: 'url?limit=10000'},
            {test: /\.(?:ttf|eot)$/, loader: 'file'},
            {test: /\.html$/, loader: 'file?name=[name].[ext]'}
        ]
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