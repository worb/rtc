var Cover = require('./Cover');
var Internal = require('./Internal');

var Coverflow = React.createClass({
  getInitialState: function() {
    return {
      selected: null,
      coverIndex: 0,
      coverLeft: 0
    }
  },
  componentWillMount: function() {
    this.COVER_WIDTH = 400 + 32;
    this.NUM_COVERS = parseInt(window.innerWidth / this.COVER_WIDTH) + 1;
    this.DRAG_EVENT = false;
  },
  handleCoverClick: function(key) {
    if(this.DRAG_EVENT === false) {
      this.setState({selected: key});
    }
    this.DRAG_EVENT = false;
  },
  handleCoverExit: function() {
    this.setState({selected: null});
  },
  handlePrev: function() {
    if(this.state.coverIndex > 0) {
      this.setState({coverIndex: this.state.index--});
    }
  },
  handleNext: function() {
    if(this.state.coverIndex < (this.props.books.length - 1)) {
      this.setState({index: this.state.coverIndex++});
    }
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
            <ul>
              {covers}
            </ul>
          </div>
        );
    } else {
      return (
        <div className="books">
          <a onClick={this.handleCoverExit}>X</a>
          <Internal book={this.props.books[this.state.selected]} handleExit={this.handleCoverExit} handleClick={this.handleCoverClick} />
        </div>
      )
    }
  }
});

module.exports = Coverflow;
