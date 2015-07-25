var StaticSiteGeneratorPlugin = require('static-render-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        publicPath: '/dist/',
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },
    externals: {
//        "react/addons": "React"
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
        new ExtractTextPlugin('style.css')
    ]
};
