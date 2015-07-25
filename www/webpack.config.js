var StaticSiteGeneratorPlugin = require('static-render-webpack-plugin');

var routes = ['/'];

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
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    plugins: [
        new StaticSiteGeneratorPlugin('bundle.js', routes)
    ]
};
