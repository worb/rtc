var Cover = require('./Cover');
var Internal = require('./Internal');

var Coverflow = React.createClass({
  getInitialState: function() {
    return {
      selected: null
    }
  },
  handleCoverClick: function(key) {
    this.setState({selected: key});
  },
  handleCoverExit: function() {
    this.setState({selected: null});
  },
  render: function(){
    if(this.state.selected === null) {
      var covers = this.props.books.map(function(book, i){
        return <Cover book={book} key={i} rKey={i} handleClick={this.handleCoverClick} />
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
          <Internal book={this.props.books[this.state.selected]} handleExit={this.handleCoverExit} />
        </div>
      )
    }
  }
});

module.exports = Coverflow;
