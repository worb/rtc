var React = require('react/addons');
var Router = require('react-router');
var Routes = require('./jsx/Routes.jsx');

// exports less to dist/style.css per extract-text-webpack-plugin
require('./less/app.less');

// export required by static gen webpack plugin. Runs on server, returns html via callback
module.exports = function(path, initialProps, callback) {
    Router.run(Routes, path, function(Root){
        var html = React.renderToString(React.createElement(Root, initialProps));
        callback('<!DOCTYPE html>' + html)
    });
}

// checks to see if we're in browser context, and renders
if(typeof document !== 'undefined') {
    var initialProps = JSON.parse(document.getElementById('initial-props').innerHTML);
    Router.run(Routes, Router.HistoryLocation, function(Root){
        React.render(React.createElement(Root, initialProps), document);
    });
}
