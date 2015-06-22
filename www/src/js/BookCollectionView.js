var BookDetailView = require('./BookDetailView');
var Cover = require('./Cover');

var BookCollectionView = React.createClass({
  getInitialState: function() {
    return {
      selected: null
    }
  },
  viewDetail: function(index) {
    this.setState({selected: index});
  },
  viewCollection: function() {
    this.setState({selected: null});
  },
  render: function(){
    covers = this.props.books.map(function(book, i){
      return (
        <li key={i}>
          <Cover book={book} index={i} handleClick={this.viewDetail} />
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
          <BookDetailView book={this.props.books[this.state.selected]} handleExit={this.viewCollection} />
        </div>
      );
    }

  }
});

module.exports = BookCollectionView;
