var React = require('react/addons');
var App = require('./jsx/App.jsx');
//require('./less/app.less');

module.exports = function(path, props, callback) {
    var html = React.renderToString(React.createElement(App, {}));
    callback(html);
}

if(typeof document !== 'undefined') {
    React.render(React.createElement(App, {}), document.getElementById('app'));
}
