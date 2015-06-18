var COVER_PATH = 'rtc_books_resized/';

var Cover = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.handleClick(this.props.key);
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
      <div onClick={this.handleClick} className={classNames}>
        <img src={file} />
      </div>
    )
  }
});

module.exports = Cover;
