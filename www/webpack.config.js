var StaticSiteGeneratorPlugin = require('static-render-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var routes = [
    {
        path: '/',
        output: '/index.html'
    }
];

// plugins and devtool for dev
var plugins = [
    new StaticSiteGeneratorPlugin('/dist/bundle.js', routes),
    new ExtractTextPlugin('/dist/style.css')
];
var devtool = "eval-source-map";

// if in production, add to plugins and set devtool to null
if(process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"'}));
    plugins.push(new webpack.optimize.UglifyJsPlugin());
    devtool = null;
}

module.exports = {
    entry: "./entry.js",
    output: {
        path: './public',
        publicPath: '/',
        filename: '/dist/bundle.js',
        libraryTarget: 'umd'
    },
    devtool: devtool,
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
    plugins: plugins
};
