var Coverflow = require('./Coverflow');
var Internal = require('./Internal');

var Parent = React.createClass({
  getInitialState: function() {
    return {
      largeTranslate: -(300 + 32) * 6,
      smallTranslate: -(120 + 32) * 6,
      largePos: -(300 + 32) * 6,
      smallPos: -(120 + 32) * 6,
      left: 0,
      selected: null
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
  render: function(){
    if(!this.state.selected) {
      return (
        <div key="app">
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
      return (<Internal book={this.props.books[this.state.selected]} handleExit={this.handleExit} />);
    }

  }
});

module.exports = Parent;
