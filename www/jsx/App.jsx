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
var _ = require('lodash');

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
          </body>
      </html>
    );
  }
});

module.exports = App;
