var React = require('react');
var Router = require('react-router');

// Setting routing settings
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// Notenote.co components
var Post = require('./components/Post');
var PostList = require('./components/PostList');
var CreatePost = require('./components/CreatePost');

var routes = (
  <Route name="home" path="/">
    <Route handler={PostList}/>
    <Route name="page" path="/page/:pageNo" handler={PostList}/>
    <Route name="newPost" path="/new" handler={CreatePost}/>
  </Route>
);


Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
