window.React = require('react/addons');
var Parent = require('./Parent');
var books = require('./books');
var _ = require('lodash');

var letters = [];

books.sort(compareTitles);

for (i = 0; i < books.length; i++) {
  new_name = books[i].name.replace('The ', '');
  letters.push(new_name.slice(0,1));
}

letters = _.uniq(letters, true);

console.log(letters);

function compareTitles(a, b) {
  aname = a.name.replace('The ', '');
  bname = b.name.replace('The ', '');
  if (aname < bname) {
    return -1;
  }
  if (aname > bname) {
    return 1;
  }
  if (aname == bname) {
    return 0;
  }
}

React.render(<Parent books={books} />, document.getElementById('app'));
