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

var BookDetailView = React.createClass({
  getInitialState: function() {
    return {
      selectedCover: 0
    }
  },
  componentWillMount: function() {
    document.body.style.backgroundColor="#f1f1f1"
  },
  componentWillUnmount: function() {
    document.body.style.backgroundColor="#fff"
  },
  handleCoverClick: function(key) {
    this.setState({selectedCover: key});
  },
  handleExit: function(event) {
    this.props.handleExit();
  },
  render: function(){
    var covers = this.props.book.covers;
    var activeCover = covers[this.state.selectedCover];
    var covers = this.props.book.covers.map(function(cover, i){
      var isSelected = false;
      if(i == this.state.selectedCover) {
        isSelected = true;
      }
      return (
        <li key={i}>
          <Cover cover={cover} index={i} handleClick={this.handleCoverClick} isSelected={isSelected} />
        </li>
      )
    }, this);
    return (
      <div className="internal">
        <button onClick={this.handleExit} className="exit" />
        <Viewer cover={activeCover} />
        <div className="meta">
          <h2>{this.props.book.name}</h2>
          <h3><small>by</small> {this.props.book.author}</h3>
          <div className="covers">
            <ul>
              {covers}
            </ul>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = BookDetailView;
