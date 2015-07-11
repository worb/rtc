var React = require('react');

var Nav = React.createClass({
  handleAboutClick: function() {
    this.props.handleModal();
  },
  handleExit: function() {
    this.props.handleExit()
  },
  render: function(){
      return (
        <nav className="main">
          <div className="brand" onClick={this.handleExit}>
            <img src="assets/images/rtc-logo-stacked.png" />
          </div>
          <ul>
            <li>
              <a href="#" onClick={this.handleAboutClick}>About</a>
            </li>
            <li>
              <a href="http://shop.thecreativeactionnetwork.com/collections/recovering-the-classics" target="_blank">Shop</a>
            </li>
            <li>
              <a href="http://thecreativeactionnetwork.com/contribute/recovering-the-classics" target="_blank">Submit</a>
            </li>
          </ul>
        </nav>
      );
  }
});

module.exports = Nav;
