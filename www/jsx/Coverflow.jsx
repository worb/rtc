var React = require('react');

/** TODO: integrate https://www.npmjs.com/package/react-clickdrag-mixin and https://www.npmjs.com/package/react.animate **/
var Cover = require('./Cover.jsx');
var Internal = require('./Internal.jsx');
var Swipeable = require('react-swipeable');

var Mousetrap = require('mousetrap');

var Coverflow = React.createClass({
  getInitialState: function() {
    return {
      selected: null,
      left: 0,
      right: this.props.NUM_COVERS + this.props.BUFFER + 4
    }
  },
  componentWillMount: function() {
    this.OFFSET = ((this.props.WIDTH % this.props.COVER_WIDTH)) / 2;
    this.DISTANCE = this.props.NUM_COVERS + this.props.BUFFER;
    var self = this;
    Mousetrap.bind('left', function() { self.handlePrev(); });
    Mousetrap.bind('right', function() { self.handleNext(); });
  },
  handleNext: function() {
      this.handleSwiped(null, this.props.COVER_WIDTH, 0, false)
  },
  handlePrev: function() {
      this.handleSwiped(null, -this.props.COVER_WIDTH, 0, false)
  },
  componentWillUnMount: function() {
    Moustrap.unbind('left');
    Moustrap.unbind('right');
  },
  handleCoverClick: function(key) {
    this.props.handleClick(key);
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
    //this.props.handleIndex(x, this.props.rKey);
  },
  snapTo: function(translation) {
    var snap = (Math.round(translation / this.props.COVER_WIDTH) * this.props.COVER_WIDTH) + this.OFFSET;
    this.props.handleMove(this.OFFSET - this.props.COVER_WIDTH * this.props.BUFFER, this.props.rKey, true);
    var move = (translation - this.props.lastPos) / this.props.COVER_WIDTH;
    move = Math.round(-move);
    this.props.handleIndex(move);
  },
  render: function(){
    covers = this.props.books.slice(this.props.left, this.props.left + this.DISTANCE + 4).map(function(book, i){
      return (
        <Cover book={book} key={i} rKey={i + this.props.left} handleClick={this.handleCoverClick} />
        )
    }, this);
      return (
        <Swipeable
        className="swipeable"
        onSwipingLeft={this.handleLeft}
        onSwipingRight={this.handleRight}
        onSwiped={this.handleSwiped}
        flickThreshold={0}
        delta={0}
        ref="swipeable"
        style={{
          WebkitTransform: "translate(" + this.props.translate + "px)",
          //WebkitTransition: '-webkit-transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
        <ul>
          {covers}
        </ul>
        </Swipeable>
      );
  }
});

module.exports = Coverflow;
