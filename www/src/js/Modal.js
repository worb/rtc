var Modal = React.createClass({
  hideModal: function(e) {
    e.preventDefault();
    this.props.hideModal();
  },
  render: function(){
      return (
        <div className="modal-container">
          <div className="modal-bg" onClick={this.hideModal}></div>
          <div className="modal-inner">
            <button onClick={this.hideModal} className="exit" />
            <p>Recovering the Classics is a crowdsourced collection of original covers for great works in the public domain where anyone <a href="http://thecreativeactionnetwork.com/contribute/recovering-the-classics/">can contribute</a>.</p>
            <p>As part of a <a href="https://www.whitehouse.gov/the-press-office/2015/04/30/fact-sheet-spreading-joy-reading-more-children-and-young-adults" target="_blank">new initiative announced by the White House</a>, we are partnering with the <a href="http://nypl.org">New York Public Library</a> and the <a href="http://dp.la">Digital Public Library of America</a> to bring these amazing covers to libraries and schools nationwide.</p>
            <p>Why? Sadly, many of the greatest classics in the public domain are left with poorly designed or auto-generated covers that fail to capture what makes these books exciting and inspiring to us. So we invited illustrators, typographers, and designers of all stripes to create new covers for 100 of the greatest works in the public domain.</p>
            <p><a href="http://thecreativeactionnetwork.com/contribute/recovering-the-classics/">Anyone can contribute</a>, and all designs are available for sale as prints, apparel, and other products to support the artists.</p>
          </div>
        </div>
      );
  }
});

module.exports = Modal;
