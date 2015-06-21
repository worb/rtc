var COVER_PATH = 'rtc_books_resized/';

var Cover = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.handleClick(this.props.index);
  },
  getImageSrc: function() {
    var path = COVER_PATH;
    if(this.props.cover) {
      path += this.props.cover.filename;
    } else {
      path += this.props.book.covers[0].filename;
    }
    return path;
  },
  render: function(){
    var classNames = "";
    if(this.props.isSelected) {
      classNames = "selected";
    }
    return (
      <div onClick={this.handleClick} className={classNames}>
        <img src={this.getImageSrc()} />
      </div>
    )
  }
});

module.exports = Cover;
