/*
The prod config aliases react/addons to the react addons minimized dist,
as well as setting the prod env variable
TODO: figure out why webpack isn't natively using this version
(or properly minimizing react) with the --production flag
*/
var StaticSiteGeneratorPlugin = require('static-render-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var routes = [
    {
        path: '/',
        output: '../index.html'
    }
];

module.exports = {
    entry: "./entry.js",
    output: {
        path: './public/dist',
        publicPath: '/',
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },
    resolve: {
        alias: {
            'react/addons': path.join(__dirname, "node_modules/react/dist/react-with-addons.min.js")
        }
    },
    devtool: "eval-source-map",
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'jsx-loader'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            }
        ]
    },
    plugins: [
        new StaticSiteGeneratorPlugin('bundle.js', routes),
        new ExtractTextPlugin('style.css'),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || false})
    ]
};
