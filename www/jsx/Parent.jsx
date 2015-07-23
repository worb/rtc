var React = require('react');

require('../less/app.less');

var Coverflow = require('./Coverflow.jsx');
var Internal = require('./Internal.jsx');
var Modal = require('./Modal.jsx');
var Nav = require('./Nav.jsx');

var Parent = React.createClass({
  getInitialState: function() {
    return {
      largeTranslate: -(300 + 32) * 6,
      smallTranslate: -(120 + 32) * 6,
      largePos: -(300 + 32) * 6,
      smallPos: -(120 + 32) * 6,
      left: 0,
      selected: null,
      modal: false
    }
  },
  componentWillMount: function() {
    this.WIDTH = window.innerWidth;

    this.SMALL_WIDTH = 120 + 32; // second is padding + margin
    this.LARGE_WIDTH = 300 + 32; //second padding + margin

    this.SMALL_COVERS = Math.round(this.WIDTH / this.SMALL_WIDTH) + 1;
    this.LARGE_COVERS = Math.round(this.WIDTH / this.LARGE_WIDTH) + 1;

  },
  handleMove: function(amount, key, pos) {

    if(key == 'small') {
      var small = amount;
      var large = (this.LARGE_WIDTH / this.SMALL_WIDTH) * amount;
    }
    if(key == 'large') {
      var small = (this.SMALL_WIDTH / this.LARGE_WIDTH) * amount;
      var large = amount;
    }

    this.setState({smallTranslate: small, largeTranslate: large});

    if(pos) {
      this.setState({smallPos: small, largePos: large})
    }

  },
  handleIndex: function(move) {
    this.setState(function(prev, props){
      if(prev.left + move <= 0) {
        return { left: 0 };
      } else {
        return { left: prev.left + move }
      }
    });
  },
  handleClick: function(index) {
    this.setState({selected: index});
  },
  handleExit: function() {
    this.setState({selected: null});
  },
  handleModalClick: function() {
    this.setState({ modal: true });
  },
  handleModalExit: function() {
    this.setState({ modal: false });
  },
  render: function(){
    var modal = "";
    if(this.state.modal) {
      modal = <Modal handleExit={this.handleModalExit} />
    }
    nav = <Nav handleModal={this.handleModalClick} handleExit={this.handleExit} />

    if(!this.state.selected) {
      return (
        <div key="app">
          {modal}
          {nav}
          <div className="large">
            <Coverflow
            rKey={"large"}
            books={this.props.books}
            WIDTH={this.WIDTH}
            COVER_WIDTH={this.LARGE_WIDTH}
            NUM_COVERS={this.LARGE_COVERS}
            BUFFER={6}
            handleMove={this.handleMove}
            handleIndex={this.handleIndex}
            handleClick={this.handleClick}
            translate={this.state.largeTranslate}
            lastPos={this.state.largePos}
            coverIndex={this.state.largeIndex}
            left={this.state.left} />
          </div>
          <div className="small">
            <Coverflow
            rKey={"small"}
            books={this.props.books}
            WIDTH={this.WIDTH}
            COVER_WIDTH={this.SMALL_WIDTH}
            NUM_COVERS={this.SMALL_COVERS}
            BUFFER={6}
            handleMove={this.handleMove}
            handleIndex={this.handleIndex}
            handleClick={this.handleClick}
            translate={this.state.smallTranslate}
            lastPos={this.state.smallPos}
            coverIndex={this.state.smallIndex}
            left={this.state.left} />
          </div>
        </div>
      );
    } else {
      return (
      <div key="app">
        {nav}
        {modal}
        <Internal book={this.props.books[this.state.selected]} handleExit={this.handleExit} />
      </div>
      );
    }

  }
});

module.exports = Parent;
