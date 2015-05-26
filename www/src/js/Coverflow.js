var Cover = require('./Cover');
var Internal = require('./Internal');
var Swipeable = require('react-swipeable');

var Coverflow = React.createClass({
  getInitialState: function() {
    return {
      selected: null,
    }
  },
  componentWillMount: function() {
    this.OFFSET = ((this.props.WIDTH % this.props.COVER_WIDTH)) / 2;
  },
  componentDidMount: function() {
    this.refs.swipeable.getDOMNode().style.webkitTransform = "translate(" + this.props.translate + "px)";
  },
  componentDidUpdate: function() {
    if(this.refs.swipeable) {
      this.refs.swipeable.getDOMNode().style.webkitTransform = "translate(" + this.props.translate + "px)";
    }
  },
  handleCoverClick: function(key) {
    this.setState({selected: key});
  },
  handleCoverExit: function(e) {
    e.preventDefault();
    this.setState({selected: null});
  },
  handleLeft: function(e, x) {
    var translation = -(x) + this.props.lastPos;
    this.props.handleMove(translation, this.props.rKey, false);
  },
  handleRight: function(e, x) {
    var translation = (x) + this.props.lastPos;
    this.props.handleMove(translation, this.props.rKey, false);
  },
  handleSwiped: function(e, x, y, isFlick) {
    if(isFlick) {
      if(x >= 0) {
        //this.handleNext(e);
      }
      if (x < 0) {
        //this.handlePrev(e);
      }
    }
    var translation = -(x) + this.props.lastPos;
    this.snapTo(translation);
    this.props.handleIndex(x, this.props.rKey);
  },
  snapTo: function(translation) {
    var snap = (Math.round(translation / this.props.COVER_WIDTH) * this.props.COVER_WIDTH) + this.OFFSET;
    console.log(snap);
    this.props.handleMove(snap, this.props.rKey, true);
  },
  render: function(){
    if(this.state.selected === null) {
      covers = this.props.books.slice(0, this.props.coverIndex + this.props.NUM_COVERS + 2).map(function(book, i){
        return (
          <Cover book={book} key={i} rKey={i} handleClick={this.handleCoverClick} />
          )
      }, this);
        return (
          <Swipeable
          className="swipeable"
          onSwipingLeft={this.handleLeft}
          onSwipingRight={this.handleRight}
          onSwiped={this.handleSwiped}
          flickThreshold={0}
          ref="swipeable"
          style={{WebkitTransform: "translate(" + this.props.translate + "px)", WebkitTransition: '-webkit-transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'}}>
          <ul>
            {covers}
          </ul>
          </Swipeable>
        );
    } else {
      return (
        <div className="books">
        <br /><br />
          <a href="#" onClick={this.handleCoverExit}>X</a>
          <br /><br />
          <Internal book={this.props.books[this.state.selected]} handleExit={this.handleCoverExit} handleClick={this.handleCoverClick} />
        </div>
      )
    }
  }
});

module.exports = Coverflow;
