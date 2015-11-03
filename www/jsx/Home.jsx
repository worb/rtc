/**********************************************************\
** Home.jsx                                               **
**                                                        **
** The root node of the Reactor app.                      **
**                                                        **
** Designed and engineered by Worb Corp.                  **
\**********************************************************/

var React = require('react');

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

var Home = React.createClass({
  render: function(){
    var bcv = <BookCollectionView books={books} />;
    return (
      <div key="app">
          {bcv}
      </div>
    );
  }
});

module.exports = Home;
