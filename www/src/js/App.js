window.React = require('react');
var Coverflow = require('./Coverflow');
var books = require('./books');

React.render(<Coverflow books={books} />, document.getElementById('app'));
