const path = require('path'),
    webpack = require('webpack');

function getPlugins () {
    return [
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourceMap: true,
            mangleProperties: {
                screw_ie8: false,
                ignore_quoted: true
            },
            compress: {
                screw_ie8: false,
                properties: false
            },
            output: {
                screw_ie8: false
            }
        })
    ];
}

module.exports = [{
    entry: './src/jquery-fusioncharts.js',
    output: {
        filename: 'fusioncharts.jqueryplugin.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
        FusionCharts: 'FusionCharts',
        jquery: 'jQuery'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    devtool: 'source-map'
},
{
    entry: './src/jquery-fusioncharts.js',
    output: {
        filename: 'fusioncharts.jqueryplugin.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
        FusionCharts: 'FusionCharts',
        jquery: 'jQuery'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    devtool: 'source-map',
    plugins: getPlugins()
}];
