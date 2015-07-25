var StaticSiteGeneratorPlugin = require('static-render-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

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
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || false}),
    ]
};
