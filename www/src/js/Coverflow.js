var Cover = require('./Cover');
var Internal = require('./Internal');
var Swipeable = require('react-swipeable');

var Coverflow = React.createClass({
  getInitialState: function() {
    return {
      selected: null,
      coverIndex: 0,
      coverLeft: 0,
      translate: 0,
      transition: {}
    }
  },
  componentWillMount: function() {
    this.COVER_WIDTH = 400 + 32;
    this.WIDTH = window.innerWidth;
    this.NUM_COVERS = Math.round(this.WIDTH / this.COVER_WIDTH) + 1;
    this.OFFSET = ((this.WIDTH % this.COVER_WIDTH)) / 2;
    console.log(this.OFFSET);
    this.TRANSLATE = Math.round(- (this.COVER_WIDTH * 2) + (this.COVER_WIDTH / this.NUM_COVERS));
    this.DRAG_EVENT = false;
    this.SWIPES = 1;
  },
  componentDidMount: function() {
    this.refs.swipeable.getDOMNode().style.webkitTransform = "translate(" + this.state.translate + "px)";
  },
  componentDidUpdate: function() {
    if(this.refs.swipeable) {
      this.refs.swipeable.getDOMNode().style.webkitTransform = "translate(" + this.state.translate + "px)";
    }
  },
  handleCoverClick: function(key) {
    if(this.DRAG_EVENT === false) {
      this.setState({selected: key});
    }
    this.DRAG_EVENT = false;
  },
  handleCoverExit: function(e) {
    e.preventDefault();
    this.setState({selected: null});
  },
  handlePrev: function(e) {
    e.preventDefault(e);

  },
  handleNext: function(e) {
    e.preventDefault(e);

  },
  handleLoad: function(e, translation) {
    e.preventDefault();

    if(!translation) {
      cover_moves = 1;
    } else {
      cover_moves = Math.round(Math.abs(translation) / (this.COVER_WIDTH / this.NUM_COVERS));
    }

    if(cover_moves > 0) {
      this.setState({coverIndex: this.state.coverIndex+cover_moves});
    }
  },
  handleLeft: function(e, x) {
    var translate = this.state.translate - x;
    this.refs.swipeable.getDOMNode().style.webkitTransform = "translate(" + translate + "px)";

  },
  handleRight: function(e, x) {
    var translate = this.state.translate + (x);
    this.refs.swipeable.getDOMNode().style.webkitTransform = "translate(" + translate + "px)";

  },
  snapTo: function(translation) {

    var snap = (Math.round(translation / this.COVER_WIDTH) * this.COVER_WIDTH) + this.OFFSET;
    this.refs.swipeable.getDOMNode().style.webkitTransform = "translate(" + snap + "px)";
    this.setState({translate: snap});
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
    var translation = -x + this.state.translate;

    //this.setState({translate: -x + this.state.translate});
    this.snapTo(translation);

    this.handleLoad(e, x);

  },
  render: function(){
    if(this.state.selected === null) {
      covers = this.props.books.slice(0, this.state.coverIndex + this.NUM_COVERS + 2).map(function(book, i){
        return (
          <Cover book={book} key={i} rKey={i} handleClick={this.handleCoverClick} />
          )
      }, this);
        return (
          <div className="books">
            <Swipeable
            className="swipeable"
            onSwipingLeft={this.handleLeft}
            onSwipingRight={this.handleRight}
            onSwiped={this.handleSwiped}
            flickThreshold={0}
            ref="swipeable"
            style={{WebkitTransition: '-webkit-transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'}}>
            <ul>
              {covers}
            </ul>
            </Swipeable>
            <br /><br />
            <a href="#" onClick={this.handlePrev}>Prev</a> | <a href="#" onClick={this.handleNext}>Next</a>
          </div>
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
