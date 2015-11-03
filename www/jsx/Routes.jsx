/*
Routes.jsx
Entry point to the React app.
Used to generate routes on both the client and the server.
Server-side routing managed in ~./server/boot/routes.js.
To add a new route you must add it and require the module.
*/

// Libs
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute

// Components
var Root = require('./Root.jsx');
var Home = require('./Home.jsx');
var About = require('./About.jsx')
var NotFound = require('./NotFound.jsx');
var Static = require('./Static.jsx');

/* Routes
Any routes defined before the slug route will
load from their handlers. Otherwise, slug will
act as a catch-all.
TODO: Implement 404 handling in slug component.
*/
var Routes = (
  <Route handler={Root} path='/' name="App">
    <Route path='/about' name="About" handler={About} />
    <Route path='/home' name="Home" handler={Home} />
    <Route path='/:slug' name="Static" handler={Static} />
    // Special routes
    <NotFoundRoute name="NotFound" handler={NotFound} />
    <DefaultRoute name="Default" handler={Home} />
  </Route>
);

module.exports = Routes;
