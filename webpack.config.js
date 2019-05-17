const MODE = 'development';  // 'production' or 'development'

// development に設定するとソースマップ有効でJSファイルが出力される
const enabledSourceMap = (MODE === 'development');

var path = require('path'),
ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: MODE,
    target: 'node',
    entry: {
        font: './node_modules/@fortawesome/fontawesome-free/css/all.css',
        stylesheet: './_sass/main.scss',
        script: './lib/index.js'
    },
    output: {
        path: path.join(__dirname, 'app/'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(s)?css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            sourceMap: enabledSourceMap,

                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                            importLoaders: 2
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: enabledSourceMap,
                        }
                    }
                ],
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            },
            {
                // 画像など
                test: /\.(gif|png|jpg)$/,
                loader: 'url-loader'  // Base64化
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader"
            }
        ],
    },
    externals: [
        'xmlhttprequest'
    ],
};
