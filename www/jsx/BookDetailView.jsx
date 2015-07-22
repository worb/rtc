/* BookDetailView.js
**
** This class displays all the covers we have for that book.
** One cover is displayed large in a viewer, along with the name
** of its artist. The remaining covers are displayed in a picker.
** When a cover in the picker is clicked or tapped, that cover
** replaces the one currently in the viewer. The book's title and
** author are also displayed as additional metadata.
*/

var React = require('react/addons');

var Cover = require('./Cover.jsx');

var COVER_PATH = 'assets/images/rtc_books_resized/';
var Transition = React.addons.CSSTransitionGroup;

var BookDetailViewer = React.createClass({
  // The viewer takes a cover and displays it along with
  // the name of its artist.
  render: function() {
    var filename = COVER_PATH + this.props.cover.filename;
    var artist = this.props.cover.artist;
    return(
      <div className="cover-viewer">
        <Transition transitionName="internalCover" component="figure">
          <img src={filename} />
          <figcaption>Cover art by {artist}</figcaption>
        </Transition>
      </div>
    )
  }
})

var BookDetailPicker = React.createClass({
  // The picker lists all the covers for the book,
  // highlights the cover currently in the Viewer,
  // and allows a new cover to be picked (hence, "Picker")
  // for display in the Viewer.
  pickCover: function(index) {
    this.props.pickCover(index);
  },
  listCover: function(cover, index) {
      var isSelected = cover == this.props.activeCover? true: false;
      return (
        <li className="cover-item" key={index}>
          <Cover cover={cover} index={index} handleClick={this.pickCover} isSelected={isSelected} />
        </li>
      )
  },
  render: function() {
    var covers = this.props.covers.map(this.listCover, this);
    return (
      <div className="cover-picker">
          <ul className="covers">
              {covers}
          </ul>
      </div>
    )
  }
})

var BookDetailMeta = React.createClass({
  // A simple component for rendering navigation
  // and metadata components in the detail view.
  render: function() {
    return (
      <nav className="book-meta">
        <button onClick={this.props.action} className="exit">&laquo; Back</button>
        <h2 className="title">{this.props.title}</h2>
        <h3 className="author">by {this.props.author}</h3>
      </nav>
    )
  }
})

var BookDetailView = React.createClass({
  // The book detail view manages which book is currently displayed
  // by the viewer. It also handles the exit back to the collection view.
  getInitialState: function() {
    return {
      selectedCover: 0
    }
  },
  viewCover: function(key) {
    this.setState({selectedCover: key});
  },
  exitView: function(event) {
    this.props.handleExit();
  },
  render: function(){
    var title = this.props.book.name;
    var author = this.props.book.author;
    var covers = this.props.book.covers;
    var activeCover = covers[this.state.selectedCover];
    return (
      <div className="book">
        <BookDetailMeta title={title} author={author} action={this.exitView} />
        <main className="book-main">
            <BookDetailViewer cover={activeCover} />
            <BookDetailPicker covers={covers} activeCover={activeCover} pickCover={this.viewCover}/>
        </main>
      </div>
    )
  }
});

module.exports = BookDetailView;
