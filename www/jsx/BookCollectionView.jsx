/* BookCollectionView.js
**
** This class displays a collection of books.
** Each book is represented by the first cover in its array.
** When a book in the collection is clicked or tapped,
** the detail view for that book is rendered.
** NOTE: THE DETAIL VIEW SHOULD BE DECOUPLED FROM THE COLLECTION VIEW!
*/

var BookDetailView = require('./BookDetailView.jsx');
var Cover = require('./Cover.jsx');

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
        <li className="book" key={i}>
          <Cover book={book} index={i} handleClick={this.viewDetail} />
        </li>
        )
    }, this);

    if(this.state.selected == null) {
      return (
        <div className="gallery">
          <ul className="large books">{covers}</ul>
          <ul className="small books">{covers}</ul>
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
