var Internal = require('./Internal');
var Cover = require('./Cover');

var CoverGallery = React.createClass({
  getInitialState: function() {
    return {
      selected: null,
      modal: false
    }
  },
  componentWillMount: function() {
    this.WIDTH = window.innerWidth;

    this.SMALL_WIDTH = 120 + 32; // second is padding + margin
    this.LARGE_WIDTH = 300 + 32; //second padding + margin

    this.SMALL_COVERS = Math.round(this.WIDTH / this.SMALL_WIDTH) + 1;
    this.LARGE_COVERS = Math.round(this.WIDTH / this.LARGE_WIDTH) + 1;
  },
  handleMove: function(amount, key, pos) {

    if(key == 'small') {
      var small = amount;
      var large = (this.LARGE_WIDTH / this.SMALL_WIDTH) * amount;
    }
    if(key == 'large') {
      var small = (this.SMALL_WIDTH / this.LARGE_WIDTH) * amount;
      var large = amount;
    }

    this.setState({smallTranslate: small, largeTranslate: large});

    if(pos) {
      this.setState({smallPos: small, largePos: large})
    }

  },
  handleClick: function(index) {
    this.setState({selected: index});
  },
  handleExit: function() {
    this.setState({selected: null});
  },
  handleModalClick: function() {
    this.setState({ modal: true });
  },
  handleModalExit: function() {
    this.setState({ modal: false });
  },
  render: function(){
    var modal = "";
    if(this.state.modal) {
      modal = <Modal handleExit={this.handleModalExit} />
    }

    covers = this.props.books.map(function(book, i){
      return (
        <li><Cover book={book} key={i} handleClick={this.handleClick} /></li>
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
        <Internal book={this.props.books[this.state.selected]} handleExit={this.handleExit} />
      </div>
      );
    }

  }
});

module.exports = CoverGallery;
