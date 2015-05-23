var Cover = require('./Cover');

var COVER_PATH = 'rtc_books/';

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
      <div className="book">
        <a className="exit" onClick={this.handleExit}>x</a>
        <ul>
        {covers}
        </ul>
      </div>
    )
  }
});

module.exports = Internal;
