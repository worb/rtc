var Cover = require('./Cover');
var Internal = require('./Internal');

var Coverflow = React.createClass({
  getInitialState: function() {
    return {
      selected: null,
      index: 0
    }
  },
  componentWillMount: function() {
    _COVER_WIDTH = 596;
    this.NUM_COVERS = parseInt(window.innerWidth / (_COVER_WIDTH + 20));
  },
  handleCoverClick: function(key) {
    this.setState({selected: key});
  },
  handleCoverExit: function() {
    this.setState({selected: null});
  },
  handlePrev: function() {

  },
  handleNext: function() {

  },
  render: function(){
    if(this.state.selected === null) {
      var covers = this.props.books.map(function(book.slice(this.state.index, this.NUM_COVERS), i){
        return <Cover book={book} key={i} rKey={i} handleClick={this.handleCoverClick} />
      }, this);
        return (
          <div className="books">
            <ul>
              <li><a onClick={this.handlePrev}>&laquo;</a></li>
              {covers}
              <li><a onClick={this.handleNext}>&raquo;</a></li>
            </ul>
          </div>
        );
    } else {
      return (
        <div className="books">
          <Internal book={this.props.books[this.state.selected]} handleExit={this.handleCoverExit} />
        </div>
      )
    }
  }
});

module.exports = Coverflow;
