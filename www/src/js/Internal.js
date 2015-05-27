var Cover = require('./Cover');

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
      return (<Cover cover={cover} key={i} rKey={i} handleClick={this.handleCoverClick} />)
    }, this);
    return (
      <div className="internal">
        <a href="#" onClick={this.handleExit} className="exit">X</a>
        <br /><br />
        <img className="main" src={COVER_PATH + this.props.book.covers[this.state.selected].filename} />
        <div className="meta">
          <h2>{this.props.book.name}</h2>
          <h3>{this.props.book.author}</h3>
          <h4><small>selected cover by</small> {this.props.book.covers[this.state.selected].artist}</h4>
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
