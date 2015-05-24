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
    this.NUM_COVERS = parseInt(window.innerWidth / this.COVER_WIDTH) + 2;
    this.DRAG_EVENT = false;
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
    e.preventDefault();
    if(this.state.coverIndex > 0) {
      this.setState({coverIndex: this.state.coverIndex-1});
    }
  },
  handleNext: function(e) {
    e.preventDefault();
    if(this.state.coverIndex < (this.props.books.length - 1)) {
      this.setState({coverIndex: this.state.coverIndex+1});
    }
  },
  render: function(){
    if(this.state.selected === null) {
      covers = this.props.books.slice(this.state.coverIndex, this.NUM_COVERS + this.state.coverIndex).map(function(book, i){
        return (
          <Cover book={book} key={i} rKey={i + this.state.coverIndex} handleClick={this.handleCoverClick} />
          )
      }, this);
        return (
          <div className="books">
            <ul>
              {covers}
            </ul>
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
