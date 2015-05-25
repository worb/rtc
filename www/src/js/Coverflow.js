var Cover = require('./Cover');
var Internal = require('./Internal');
var Swipeable = require('react-swipeable');

var Coverflow = React.createClass({
  getInitialState: function() {
    return {
      selected: null,
      coverIndex: 5,
      coverLeft: 0,
      translate: 0
    }
  },
  componentWillMount: function() {
    this.COVER_WIDTH = 400 + 32;
    this.NUM_COVERS = parseInt(window.innerWidth / this.COVER_WIDTH) + 2;
    this.TRANSLATE = parseInt(- (this.COVER_WIDTH * 2) + (this.COVER_WIDTH / this.NUM_COVERS));
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
    if(this.state.coverIndex > 2) {
      this.setState({coverIndex: this.state.coverIndex-1});
    } else {
      this.setState({coverIndex: 2});
    }
  },
  handleNext: function(e) {
    e.preventDefault();
    if(this.state.coverIndex < (this.props.books.length - 1)) {
      this.setState({coverIndex: this.state.coverIndex+1});
    }
  },
  handleLeft: function(e, x) {
    var translate = this.state.translate - x;
    this.refs.swipeable.getDOMNode().style.webkitTransform = "translate(" + translate + "px)";
    /*if(x > this.COVER_WIDTH * this.SWIPES) {
      console.log(x - (this.COVER_WIDTH * this.SWIPES));
      this.handleNext(e);
      this.SWIPES++;
    }*/
  },
  handleRight: function(e, x) {
    var translate = this.state.translate + (x);
    this.refs.swipeable.getDOMNode().style.webkitTransform = "translate(" + translate + "px)";
    /*if(x > this.COVER_WIDTH * this.SWIPES) {
      console.log(x - (this.COVER_WIDTH * this.SWIPES));
      this.handlePrev(e);
      this.SWIPES++
    }*/
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
    this.setState({translate: -x + this.state.translate});
    //this.refs.swipeable.getDOMNode().style.webkitTransform = "translate(" + this.TRANSLATE + "px)"
    this.SWIPES = 1;
  },
  render: function(){
    if(this.state.selected === null) {
      covers = this.props.books.map(function(book, i){
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
            style={{WebKitTransition: "-webkit-transform .5s ease 0"}}>
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
