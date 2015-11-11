var StaticSiteGeneratorPlugin = require('static-render-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var routes = [
    '/',
    '/press',
    '/nypl'
];

var props = {};

var books = require('./jsx/books.jsx');

props.books = books;

var slugify = require('slugs');

//load only lodash functions we need
var _each = require('lodash/collection/forEach');

books.sort(function(a, b) {
  // Alphabetically sorts the collection of titles
  aname = a.name.replace('The ', '');
  bname = b.name.replace('The ', '');
  if (aname < bname) {
    return -1;
  }
  if (aname > bname) {
    return 1;
  }
  if (aname == bname) {
    return 0;
  }
});

_each(books, function(book){
    var prefix = '/book/';
    var slug = slugify(book.name);
    routes.push(prefix + slug);
});

// plugins and devtool for dev
var plugins = [
    new StaticSiteGeneratorPlugin('/dist/bundle.js', routes, props),
    new ExtractTextPlugin('/dist/style.css'),
    new webpack.DefinePlugin({GA_TRACKING_CODE: JSON.stringify('UA-32150387-3')})
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
            },
            {
                test: /\.md$/,
                loader: 'html!markdown'
            }
        ]
    },
    plugins: plugins
};
