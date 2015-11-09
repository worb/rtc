/**********************************************************\
** Home.jsx                                               **
**                                                        **
** The root node of the Reactor app.                      **
**                                                        **
** Designed and engineered by Worb Corp.                  **
\**********************************************************/

var React = require('react');

var BookCollectionView = require('./BookCollectionView.jsx');

var Home = React.createClass({
  render: function(){
    var bcv = <BookCollectionView books={this.props.books} />;
    return (
      <div key="app">
          {bcv}
      </div>
    );
  }
});

module.exports = Home;
