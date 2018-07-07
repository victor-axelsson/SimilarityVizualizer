var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: './src/js/main.js',
    output: {
        path: './dist',
        filename: 'main.min.js',
        publicPath: '/'
    },
    devServer: {
        inline: true,
        contentBase: './dist'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            }
        ]
    },
    resolve: {
        root: path.resolve(__dirname),
        alias: {
            api: 'src/js/api',
            components: 'src/js/components',
            core: 'src/js/core',
            img: 'dist/img'

        },
        extensions: ['', '.js', '.jsx', '.png']
    },
    plugins: debug ? [
        new ExtractTextPlugin('main.min.css', {
            allChunks: true
        })
    ] : [
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('main.min.css', {
            allChunks: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            sourcemap: false
        })
    ]
};

//NODE_ENV=production webpack <- for build a live version
