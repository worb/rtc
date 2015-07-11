var React = require('react/addons');

var Cover = require('./Cover.jsx');

var COVER_PATH = 'assets/images/rtc_books_resized/';
var Transition = React.addons.CSSTransitionGroup;

var Internal = React.createClass({
  getInitialState: function() {
    return {
      selectedCover: 0
    }
  },
  componentWillMount: function() {
    document.body.style.backgroundColor="#f1f1f1"
  },
  componentWillUnmount: function() {
    document.body.style.backgroundColor="#fff"
  },
  handleCoverClick: function(key) {
    this.setState({selectedCover: key});
  },
  handleExit: function(event) {
    this.props.handleExit();
  },
  render: function(){
    var covers = this.props.book.covers.map(function(cover, i){
      var isSelected = false;
      if(i == this.state.selectedCover) {
        isSelected = true;
      }
      return (<Cover cover={cover} key={i} rKey={i} handleClick={this.handleCoverClick} isSelected={isSelected} />)
    }, this);
    return (
      <div className="internal">
        <a href="#" onClick={this.handleExit} className="exit"></a>
        <div className="cover">
        <Transition transitionName="internalCover" component="div">
          <img key={this.state.selectedCover} src={COVER_PATH + this.props.book.covers[this.state.selectedCover].filename} />
        </Transition>
          <h4><small>Cover art by</small> {this.props.book.covers[this.state.selectedCover].artist}</h4>
        </div>
        <div className="meta">
          <h2>{this.props.book.name}</h2>
          <h3><small>by</small> {this.props.book.author}</h3>
          <div className="covers">
            <ul>
              {covers}
            </ul>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Internal;
