var webpack = require('webpack');

module.exports = {
    debug: true,
    devtool: 'eval',
    entry: {
        'router.js':[
            './web/js/router'
        ]
        //'router.js': './web/js/router'
    },
    output: {
        path: __dirname + '/web/build/',
        publicPath: 'build/',
        sourcePrefix: '',
        filename: '[name]'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    resolve: {
        extensions: ['', '.json', '.js', '.jsx', '.css', '.less']
    },
    module: {
        loaders: [
            {test: /\.js$/, loaders:['react-hot','babel'], exclude: /node_modules|bower_components/}, // jsx?harmony&stripTypes
            {test: /\.json$/, loader: 'json'},
            {test: /\.css$/, loader: 'style!css!autoprefixer'},
            {test: /\.less$/, loader: 'style!css!autoprefixer!less?strictMath'},
            {test: /\.(?:woff|woff2|png|jpg|jpeg|gif|svg)$/, loader: 'url?limit=10000'},
            {test: /\.(?:ttf|eot)$/, loader: 'file'}
        ]
    },
    devServer: {
        contentBase: __dirname + '/web/',
        hot: true,
        lazy: false,
        port: 8081,
        historyApiFallback: {
            index: 'index.html',
            rewrites: [
                //{from: /\/soccer/, to: '/soccer.html'}
            ]
        }
    }
};