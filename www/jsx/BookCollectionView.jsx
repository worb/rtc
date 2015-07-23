/* BookCollectionView.js
**
** This class displays a collection of books.
** Each book is represented by the first cover in its array.
** When a book in the collection is clicked or tapped,
** the detail view for that book is rendered.
** NOTE: THE DETAIL VIEW SHOULD BE DECOUPLED FROM THE COLLECTION VIEW!
*/

var React = require('react');

var BookDetailView = require('./BookDetailView.jsx');
var Cover = require('./Cover.jsx');

var BookCollectionView = React.createClass({
  getInitialState: function() {
    return {
      largeScrollX: 0,
      smallScrollX: 0,
      largeCoverWidth: 400,
      smallCoverWidth: 230,
      pageWidth: window.innerWidth,
      selected: null,
      grid: false,
      scrolled: false
    }
  },
  viewDetail: function(index) {
    this.setState({selected: index});
  },
  viewCollection: function() {
    this.setState({selected: null});
  },
  handleScroll: function() {
     // ComponentDidMount isn't getting proper values, so we do this setup when someone scrolls.
     if(!this.state.scrolled) {
         this.setState({
             scrolled: true
         });
         // Gets the width of the covers from the dom.
         console.log(document.querySelector('.small li.cover').offsetWidth)
         this.setState({
             largeCoverWidth: document.querySelector('.large li.cover').offsetWidth,
             smallCoverWidth: document.querySelector('.small li.cover').offsetWidth
         });
         // Sets the width of the gallery ul so their containers overflow and show appropriate scrollbars
         // TODO: figure out why the small UL is ending up too large?
         document.querySelector('.large.covers').style.width = this.state.largeCoverWidth * this.props.books.length + 'px';
         document.querySelector('.small.covers').style.width = this.state.smallCoverWidth * this.props.books.length + 'px';
     }

     // Detects if the scroll was on the small or the large, and updates state appropriately
     // TODO: sync scroll
     if(React.findDOMNode(this.refs.large).scrollLeft !== this.state.largeScrollX) {
         this.setState({
             largeScrollX: React.findDOMNode(this.refs.large).scrollLeft
         });
     } else if(React.findDOMNode(this.refs.small).scrollLeft !== this.state.smallScrollX) {
         this.setState({
             smallScrollX: React.findDOMNode(this.refs.small).scrollLeft
         });
     } else {

     }
  },
  render: function(){
    display_mode = this.state.grid ? 'grid' : 'scroll';
    covers = this.props.books.map(function(book, i){
      return (
        <li className="cover" key={i}>
          <Cover book={book} index={i} handleClick={this.viewDetail} />
        </li>
        )
    }, this);

    if(this.state.selected == null) {

      // Sets the slice position for the covers, with offsets to account for starting edge case.
      var largeStart = 0;
      var largeEnd = 1 + Math.round((this.state.pageWidth + this.state.largeScrollX) / this.state.largeCoverWidth);
      var smallStart = 0;
      var smallEnd = 4 + Math.round((this.state.pageWidth + this.state.smallScrollX) / this.state.smallCoverWidth);

      return (
        <div className="gallery">
            <div className="large container" ref="large" onScroll={this.handleScroll}>
                <ul className="large covers scroll">{covers.slice(largeStart, largeEnd)}</ul>
            </div>
            <div className="small container" ref="small" onScroll={this.handleScroll}>
                <ul className={"small covers " + display_mode}>{covers.slice(smallStart, smallEnd)}</ul>
            </div>
        </div>
      );
    } else {
      return <BookDetailView book={this.props.books[this.state.selected]} handleExit={this.viewCollection} />;
    }

  }
});

module.exports = BookCollectionView;
