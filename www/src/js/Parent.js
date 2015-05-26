var Coverflow = require('./Coverflow');

var Parent = React.createClass({
  getInitialState: function() {
    return {
      largeTranslate: 0,
      smallTranslate: 0,
      smallPos: 0,
      largePos: 0
    }
  },
  componentWillMount: function() {
    this.SMALL_WIDTH = 120;
    this.LARGE_WIDTH = 300;
  },
  handleMove: function(amount, key, pos) {
    if(key == 'small') {
      var large = (this.LARGE_WIDTH / this.SMALL_WIDTH) * amount;
      this.setState({smallTranslate: amount, largeTranslate: large})
      if(pos) {
        this.setState({smallPos: amount, largePos: large})
      }
    }
    if(key == 'large') {
      var small = (this.SMALL_WIDTH / this.LARGE_WIDTH) * amount;
      this.setState({smallTranslate: small, largeTranslate: amount})
      if(pos) {
        this.setState({smallPos: small, largePos: amount})
      }
    }
    this.setState({translate: amount});
  },
  render: function(){
    return (
      <div>
        <div className="large">
          <Coverflow
          books={this.props.books}
          width={this.LARGE_WIDTH}
          handleMove={this.handleMove}
          rKey={"large"}
          translate={this.state.largeTranslate}
          lastPos={this.state.largePos} />
        </div>
        <div className="small">
          <Coverflow
          books={this.props.books}
          width={this.SMALL_WIDTH}
          handleMove={this.handleMove}
          rKey={"small"}
          translate={this.state.smallTranslate}
          lastPos={this.state.smallPos} />
        </div>
      </div>
    );
  }
});

module.exports = Parent;
