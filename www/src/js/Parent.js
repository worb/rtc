var Coverflow = require('./Coverflow');

var Parent = React.createClass({
  getInitialState: function() {
    return {
      largeTranslate: 0,
      smallTranslate: 0,
      smallPos: 0,
      largePos: 0,
      largeIndex: 0,
      smallIndex: 0
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
  handleIndex: function(amount, key) {
    if(key == 'small') {
      var cover_moves = Math.round(Math.abs(amount) / (this.SMALL_WIDTH / this.SMALL_COVERS));
    }
    if(key == 'large') {
      var cover_moves = Math.round(Math.abs(amount) / (this.LARGE_WIDTH / this.LARGE_COVERS));
    }
    this.setState({largeIndex: this.state.largeIndex + cover_moves, smallIndex: this.state.smallIndex + cover_moves});
  },
  render: function(){
    return (
      <div>
        <div className="large">
          <Coverflow
          rKey={"large"}
          books={this.props.books}
          WIDTH={this.WIDTH}
          COVER_WIDTH={this.LARGE_WIDTH}
          NUM_COVERS={this.LARGE_COVERS}
          handleMove={this.handleMove}
          handleIndex={this.handleIndex}
          translate={this.state.largeTranslate}
          lastPos={this.state.largePos}
          coverIndex={this.state.largeIndex} />
        </div>
        <div className="small">
          <Coverflow
          rKey={"small"}
          books={this.props.books}
          WIDTH={this.WIDTH}
          COVER_WIDTH={this.SMALL_WIDTH}
          NUM_COVERS={this.SMALL_COVERS}
          handleMove={this.handleMove}
          handleIndex={this.handleIndex}
          translate={this.state.smallTranslate}
          lastPos={this.state.smallPos}
          coverIndex={this.state.smallIndex} />
        </div>
      </div>
    );
  }
});

module.exports = Parent;
