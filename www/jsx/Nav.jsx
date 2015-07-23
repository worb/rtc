// Nav.js

var React = require('react');

var Modal = React.createClass({
  // A modal dialog box containing information about the gallery
  // and about the Recovering the Classics project.
  hideModal: function(e) {
    e.preventDefault();
    this.props.hideModal();
  },
  render: function(){
    // Visibility is controlled through the application of a 'hidden' class
    // because visibility is appearance and should be controlled via CSS.
    // That is to say, the information in in the modal should always be
    // rendered into the DOM, but it usually should not appear to the user.
    var modalClass = "modal-container";
    if (!this.props.modalIsVisible) {
      modalClass += " hidden";
    }
    return (
      <div className={modalClass}>
        <div className="modal-bg" onClick={this.hideModal}></div>
        <div className="modal-inner" id="about">
          <button onClick={this.hideModal} className="exit">Close</button>
          <p>Recovering the Classics is a crowdsourced collection of original covers for great works in the public domain where anyone <a href="http://thecreativeactionnetwork.com/contribute/recovering-the-classics/">can contribute</a>.</p>
          <p>As part of a <a href="https://www.whitehouse.gov/the-press-office/2015/04/30/fact-sheet-spreading-joy-reading-more-children-and-young-adults" target="_blank">new initiative announced by the White House</a>, we are partnering with the <a href="http://nypl.org">New York Public Library</a> and the <a href="http://dp.la">Digital Public Library of America</a> to bring these amazing covers to libraries and schools nationwide.</p>
          <p>Why? Sadly, many of the greatest classics in the public domain are left with poorly designed or auto-generated covers that fail to capture what makes these books exciting and inspiring to us. So we invited illustrators, typographers, and designers of all stripes to create new covers for 100 of the greatest works in the public domain.</p>
          <p><a href="http://thecreativeactionnetwork.com/contribute/recovering-the-classics/">Anyone can contribute</a>, and all designs are available for sale as prints, apparel, and other products to support the artists.</p>
        </div>
      </div>
    );
  }
});

var Nav = React.createClass({
  // Provides information about the project, as well as links to other RTC sites.
  // Uses a modal dialog to present information about the page and project.
  // The navigation maintains the state for the modal dialog.
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
    var modal = <Modal modalIsVisible={this.state.modalIsVisible} hideModal={this.hideModal} />;
    var shopURL = "http://shop.thecreativeactionnetwork.com/collections/recovering-the-classics";
    var contributeURL = "http://thecreativeactionnetwork.com/contribute/recovering-the-classics";
    var rtcLogoImageURL = "assets/images/rtc-logo-stacked.png";
    var exhibitURL = "http://50x50.us"
    return (
      <nav className="main">
        <div className="brand" onClick={this.handleExit}>
          <img src={rtcLogoImageURL} />
        </div>
        {modal}
        <ul>
          <li><a href="#about" onClick={this.showModal}>About</a></li>
          <li><a href={shopURL} target="_blank">Shop</a></li>
          <li><a href={contributeURL} target="_blank">Contribute</a></li>
          <li><a href={exhibitURL} target="_blank">Exhibit</a></li>
        </ul>
      </nav>
    );
  }
});

module.exports = Nav;
