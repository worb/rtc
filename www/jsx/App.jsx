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

window.React = require('react/addons');
var Nav = require('./Nav');
var BookCollectionView = require('./BookCollectionView');
var books = require('./books');
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
      <div key="app">
        {nav}
        {bcv}
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
