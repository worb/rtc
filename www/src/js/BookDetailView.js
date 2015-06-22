/* BookDetailView.js
**
** This class displays all the covers we have for that book.
** One cover is displayed large in a viewer, along with the name
** of its artist. The remaining covers are displayed in a picker.
** When a cover in the picker is clicked or tapped, that cover
** replaces the one currently in the viewer. The book's title and
** author are also displayed as additional metadata.
*/

var Cover = require('./Cover');

var COVER_PATH = 'rtc_books_resized/';
var Transition = React.addons.CSSTransitionGroup;

var Viewer = React.createClass({
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

var Picker = React.createClass({
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
        <li key={index}>
          <Cover cover={cover} index={index} handleClick={this.pickCover} isSelected={isSelected} />
        </li>
      )
  },
  render: function() {
    var covers = this.props.covers.map(this.listCover, this);
    return (
      <div className="cover-picker">
        <ul>
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
      <nav className="meta">
        <button onClick={this.props.action} className="exit">Back</button>
        <div>
          <h2>{this.props.title}</h2>
          <h3>by {this.props.author}</h3>
        </div>
      </nav>
    )
  }
})

var BookDetailView = React.createClass({
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
      <div className="internal">
        <BookDetailMeta title={title} author={author} action={this.exitView} />
        <Viewer cover={activeCover} />
        <Picker covers={covers} activeCover={activeCover} pickCover={this.viewCover}/>
      </div>
    )
  }
});

module.exports = BookDetailView;
