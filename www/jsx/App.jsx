/**********************************************************\
** Recovering the Classics                                **
**                                                        **
** A gallery for displaying a collection of books         **
** and their respective collections of crowdsourced       **
** covers. The gallery provides an easy way to browse     **
** these works in collection and detail views.            **
**                                                        **
** Designed and engineered by Worb Corp.                  **
\**********************************************************/

var React = require('react/addons');

var Nav = require('./Nav.jsx');
var BookCollectionView = require('./BookCollectionView.jsx');
var books = require('./books.jsx');

//load only lodash functions we need
var _each = require('lodash/collection/forEach');
var _uniq = require('lodash/collection/forEach');

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

function buildAlphabet(books) {
  // Builds the alphabet of present book titles
  // For example, a book collection like ["Alpha", "Beta", "Gamma"]
  // would return an alphabet of ["A", "B", "C"]
  var alphabet = [];
  _.each(books, function(book){
      cleaned_title = book.name.replace('The ', '');
      alphabet.push(cleaned_title.slice(0,1));
  });
  alphabet = _.uniq(alphabet, true);
  console.log(alphabet);
  return alphabet;
}

function returnGa() {
    return "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');\
    ga('create', 'UA-32150387-3', 'auto');\
    ga('send', 'pageview');"
}
var App = React.createClass({
  // The entry point of the application, composed
  // of a header navigation bar and cover gallery.
  render: function(){
    var nav = <Nav handleModal={this.handleModalClick} handleExit={this.handleExit} />;
    var bcv = <BookCollectionView books={books} />;
    return (
      <html>
          <head>
              <title>Recovering the Classics</title>
              <meta name="apple-mobile-web-app-capable" content="yes" />
              <meta name="viewport" content="width=device-width" />
              <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
              <link rel="apple-touch-icon" href="assets/images/touch-icon-iphone.png" />
              <link rel="apple-touch-icon" sizes="76x76" href="assets/imagestouch-icon-ipad.png" />
              <link rel="apple-touch-icon" sizes="120x120" href="assets/images/touch-icon-iphone-retina.png" />
              <link rel="apple-touch-icon" sizes="152x152" href="assets/images/touch-icon-ipad-retina.png" />
              <link href='/dist/style.css' rel='stylesheet' type='text/css' />
              <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css' />
          </head>
          <body>
            <div key="app">
                {nav}
                {bcv}
            </div>
            <script src="/dist/bundle.js"/>
            <script dangerouslySetInnerHTML={{__html: returnGa() }} />
          </body>
      </html>
    );
  }
});

module.exports = App;
