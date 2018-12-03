const path = require('path'),
    WrapperPlugin = require('wrapper-webpack-plugin'),
    header = module.exports = `
    (function (factory) {
        if (typeof module === 'object' && typeof module.exports !== "undefined") {
            module.exports = factory;
        } else {
            factory(FusionCharts);
        }
    }(function (FusionCharts) {
`,
    footer = `}));
`;

function getPlugins () {
    return [
        new WrapperPlugin({
            test: /^fusioncharts\.jqueryplugin\.js/,
            header: header,
            footer: footer
        })
    ];
}

module.exports = [{
    entry: './src/jquery-fusioncharts.js',
    mode: 'none',
    output: {
        filename: 'fusioncharts.jqueryplugin.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: /^(jquery|\$|fusioncharts)$/i,
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: getPlugins()
}];