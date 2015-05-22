'use strict';

var React        = require('react');
var Router       = require('react-router');
var PostList     = require('./Postlist.jsx');
var Page         = require('./Page.jsx');

// Setting routing settings
var DefaultRoute = Router.DefaultRoute;
var Route        = Router.Route;

var routes = (
  <Route name="home" path="/" handler={PostList}>
    <Route name="page" path="/page/:pageNo" handler={Page}/>
    <DefaultRoute handler={Page}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
