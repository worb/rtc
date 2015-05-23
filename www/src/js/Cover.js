var COVER_PATH = 'rtc_books_resized/';

var Cover = React.createClass({
  handleClick: function(e) {
    this.props.handleClick(this.props.rKey);
  },
  render: function(){
    var file = '';

    if(this.props.cover) {
      file = COVER_PATH + this.props.cover.filename;
    } else {
      file = COVER_PATH + this.props.book.covers[0].filename;
    }

    return (
      <li>
        <img src={file} onClick={this.handleClick} />
      </li>
    )
  }
});

module.exports = Cover;
