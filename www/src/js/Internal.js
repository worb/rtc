var Cover = require('./Cover');
var Transition = React.addons.CSSTransitionGroup;

var COVER_PATH = 'rtc_books_resized/';

var Internal = React.createClass({
  getInitialState: function() {
    return {
      selected: 0
    }
  },
  handleCoverClick: function(key) {
    this.setState({selected: key});
  },
  handleExit: function(event) {
    this.props.handleExit();
  },
  render: function(){
    var covers = this.props.book.covers.map(function(cover, i){
      var isSelected = false;
      if(i == this.state.selected) {
        console.log(cover);
        isSelected = true;
      }
      return (<Cover cover={cover} key={i} rKey={i} handleClick={this.handleCoverClick} isSelected={isSelected} />)
    }, this);
    return (
      <div className="internal">
        <a href="#" onClick={this.handleExit} className="exit"></a>
        <Transition name="internalCover">
        <div className="cover">
          <img src={COVER_PATH + this.props.book.covers[this.state.selected].filename} />
          <h4><small>Cover art by</small> {this.props.book.covers[this.state.selected].artist}</h4>
        </div>
        </Transition>
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

module.exports = Internal;
