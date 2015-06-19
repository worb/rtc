var Modal = require('./Modal');

var Nav = React.createClass({
  getInitialState: function() {
    return {
      modalIsVisible: false
    }
  },
  showModal: function(e) {
    e.preventDefault();
    this.setState({ modalIsVisible: true });
  },
  hideModal: function() {
    this.setState({ modalIsVisible: false });
  },
  handleExit: function() {
    this.props.handleExit()
  },
  render: function(){
    var modal;
    if(this.state.modalIsVisible) {
      modal = <Modal hideModal={this.hideModal} />
    } else {
      modal = "";
    }
    var shopURL = "http://shop.thecreativeactionnetwork.com/collections/recovering-the-classics";
    var submitURL = "http://thecreativeactionnetwork.com/contribute/recovering-the-classics";
    var rtcLogoImageURL = "rtc-logo-stacked.png";
    return (
      <nav className="main">
        {modal}
        <div className="brand" onClick={this.handleExit}>
          <img src={rtcLogoImageURL} />
        </div>
        <ul>
          <li><a href="#" onClick={this.showModal}>About</a></li>
          <li><a href={shopURL} target="_blank">Shop</a></li>
          <li><a href={submitURL} target="_blank">Submit</a></li>
        </ul>
      </nav>
    );
  }
});

module.exports = Nav;
