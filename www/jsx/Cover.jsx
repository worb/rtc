var React = require('react');

var COVER_PATH = 'assets/images/rtc_books_resized/';

var Cover = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.handleClick(this.props.rKey);
  },
  render: function(){
    var file = '';

    if(this.props.cover) {
      file = COVER_PATH + this.props.cover.filename;
    } else {
      file = COVER_PATH + this.props.book.covers[0].filename;
    }

    var classNames = "";
    if(this.props.isSelected) {
      classNames = "selected";
    }

    return (
      <li onClick={this.handleClick} className={classNames}>
        <img src={file} />
      </li>
    )
  }
});

module.exports = Cover;
