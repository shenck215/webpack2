'use strict'

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import glob from 'glob';

import {
    config,
} from './package.json';

/**
 * Function getEntry
 * 得到入口文件
 * @return {Object} filesObj 入口文件对象
 */
let getEntry = (src) => {

    let filesObj = {};

    let files = glob.sync(src.js, {});

    //create fileObj
    files.forEach(function (item) {
        let index = item.lastIndexOf('/');
        if (index > -1) {
            let values = item.split('.'),
                value = [path.resolve(__dirname, item)];
            values.pop();
            let key = values.join("");
            filesObj[key] = value;
        }
    });
    return filesObj;
}

const myWebpackConfig = {
    entry: getEntry(config),
    output: {
        path: path.resolve(__dirname),
        publicPath: "http://127.0.0.1:2233",
        filename: 'build/[name].js',
    },
    resolve: {
        extensions: [
            '.js',
            '.css',
            '.less',
            '.json',
            '.html',
            '.jpg',
            '.png',
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                exclude: function (path) {
                    // 路径中含有 plugins 的就不去解析。
                    var isNpmModule = !!path.match(/\\plugins\\/);
                    return isNpmModule;
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'less-loader',
                    ]
                })

            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            }, {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                loader: 'url-loader?limit=8192&name=build/src/images/[hash:8].[name].[ext]',//小于8K的图片打包进js里
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.*$/,
                loader: 'file-loader?&name=build/src/file/[name].[ext]',
                exclude: /\.js$|\.css$|\.less$|\.json$|\.hbs$|\.(png|jpg|jpeg)$|\.html$/,
            }
        ]
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        port: 2233,
        compress: true, /* gizp */
        publicPath: '/',
        inline: true,
        historyApiFallback: true,
    },
    plugins: [
        new ExtractTextPlugin('build/[name].css'),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ]
}

export default myWebpackConfig;