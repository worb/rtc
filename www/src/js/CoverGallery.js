var Internal = require('./Internal');
var Cover = require('./Cover');

var CoverGallery = React.createClass({
  getInitialState: function() {
    return {
      selected: null
    }
  },
  handleClick: function(index) {
    this.setState({selected: index});
  },
  viewCollection: function() {
    this.setState({selected: null});
  },
  render: function(){
    covers = this.props.books.map(function(book, i){
      return (
        <li key={i}>
          <Cover book={book} index={i} handleClick={this.handleClick} />
        </li>
        )
    }, this);

    if(!this.state.selected) {
      return (
        <div className="gallery">
          <ul className="large">{covers}</ul>
          <ul className="small">{covers}</ul>
        </div>
      );
    } else {
      return (
        <div className="gallery">
          <Internal book={this.props.books[this.state.selected]} handleExit={this.viewCollection} />
        </div>
      );
    }

  }
});

module.exports = CoverGallery;
