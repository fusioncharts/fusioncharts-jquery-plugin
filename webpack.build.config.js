const path = require('path'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    BOOLEAN_OBJ = {
        'true': true,
        'false': false
    },
    WrapperPlugin = require('wrapper-webpack-plugin'),
    header = (module.exports = `
      (function (factory) {
          if (typeof module === 'object' && typeof module.exports !== "undefined") {
              module.exports = factory;
          } else {
              factory(FusionCharts);
          }
      }(function (FusionCharts) {

  `),
    footer = `}));
`;

function getPlugins() {
    return [
        new WrapperPlugin({
            test: /^fusioncharts\.jqueryplugin\.js/,
            header: header,
            footer: footer
        })
    ];
}

function getBabelPlugins (isIE8) {
    if (isIE8) {
        return [
            ['transform-es3-member-expression-literals'],
            ['transform-es3-property-literals']
        ];
    }
}

function getWebpackOptimizations(isIE8, isMinified) {
    let optimization = {
        splitChunks: {
            name: 'fusioncharts.common'
        }
    };
    if (isMinified && isIE8) {
        optimization.minimize = true;
        optimization.minimizer = [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    ecma: 5,
                    ie8: true,
                    mangle: true,
                    compress: true,
                    keep_classnames: true,
                    keep_fnames: false
                }
            })
        ];
    }
    return optimization;
}

function getArgumentForWebpack(value, def) {
    return BOOLEAN_OBJ[value] === undefined ? def : BOOLEAN_OBJ[value];
}

module.exports = env => {
    const IS_IE8 = getArgumentForWebpack(env.ie8, false);
    const IS_MINIFIED = getArgumentForWebpack(env.minify, false);

    return [
    ({
        entry: './src/jquery-fusioncharts.js',
        mode: 'production',
        output: {
            filename: 'fusioncharts.jqueryplugin.min.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        externals: /^(jquery|\$|fusioncharts)$/i,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            cacheDirectory: true,
                            plugins: getBabelPlugins(IS_IE8),
                            presets: [['env', {
                                targets: { browsers: ['> 0.1%'] },
                                modules: IS_IE8 ? 'commonjs' : false,
                                loose: true
                            }]]
                        }
                    }
                }
            ]
        },
        // devtool: 'source-map',
        optimization: getWebpackOptimizations(IS_IE8, IS_MINIFIED),
        plugins: getPlugins()
    })];
};
