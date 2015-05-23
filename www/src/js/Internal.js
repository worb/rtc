var Cover = require('./Cover');
var Draggable = require('react-draggable');

var COVER_PATH = 'rtc_books_resized/';

var Internal = React.createClass({
  handleClick: function(event) {
    console.log('click');
  },
  handleExit: function(event) {
    this.props.handleExit();
  },
  render: function(){
    covers = this.props.book.covers.map(function(cover, i){
      return (
        <Cover book={this.props.book} key={i} rKey={i} cover={cover} handleClick={this.handleClick} />
      )
    }, this);
    return (
      <Draggable
      zIndex={1000}
      axis="x"
      onDrag={this.handleDrag}
      >
      <div className="book">
        <ul>
        {covers}
        </ul>
      </div>
      </Draggable>
    )
  }
});

module.exports = Internal;
