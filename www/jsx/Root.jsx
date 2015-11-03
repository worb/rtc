/**********************************************************\
** Root.jsx                                               **
**                                                        **
** The root node of the Reactor app.                      **
**                                                        **
** Designed and engineered by Worb Corp.                  **
\**********************************************************/

// Libs
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

//Components
var Nav = require('./Nav.jsx');

var Root = React.createClass({
  // The entry point of the application
  render: function(){
    return (
        <html>
            <head>
                <title>Recovering the Classics</title>
                <meta name="viewport" content="width=device-width" />
                <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
                <link href='/dist/style.css' rel='stylesheet' type='text/css' />
            </head>
            <body>
                <Nav />
                <div id="app">
                    <RouteHandler />
                </div>
                <script src="/dist/bundle.js"/>
            </body>
        </html>
    );
  }
});

module.exports = Root;
