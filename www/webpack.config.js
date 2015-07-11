module.exports = {
    entry: "./entry.js",
    output: {
        path: './public/dist',
        publicPath: '/dist/',
        filename: "bundle.js"
    },
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
    }
};
