/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');

// Setting routing settings
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var Post = React.createClass({
    render: function() {
        return (
            <article>
                {this.props.children}
                <span class='author'>
                    by {this.props.written_by}
                </span>
            </article>
        );
    }
});

var PostList = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function(){
        console.log("Params: " + this.context.router.getCurrentParams().pageNo);
        return {
            currentPage: parseInt(this.context.router.getCurrentParams().pageNo),
            data: []
        };
    },

    getUrl: function(page){
        var url = '/api/posts/';
        var pageToLoad = page || this.getCurrentPage();
        if(pageToLoad){
            url += '?page=' + pageToLoad;
        }
        return url;
    },

    getCurrentPage: function(){
        return this.state.currentPage || 1;
    },

    getPreviousPage: function(){
        if(this.state.hasPrevious && this.getCurrentPage() > 1){
            return this.getCurrentPage() - 1;
        }
    },

    getNextPage: function(){
        if(this.state.hasNext){
            return this.getCurrentPage() + 1;
        }
    },

    componentWillReceiveProps: function(newProps){
        console.log('PageNo:' + newProps.params.pageNo);
        this.setState({
            currentPage: parseInt(newProps.params.pageNo)
        });
        this.loadPostsFromServer(newProps.params.pageNo);
    },

    componentWillUpdate: function(nextProps, nextState){  
    },

    loadPostsFromServer: function(page){
        console.log('load from server... ' + this.getUrl());
        var url = this.getUrl(page);
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({
                    data: data.results, 
                    hasNext: data.next, 
                    hasPrevious: data.previous,
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function(){
        console.log('component did mount...');
        this.loadPostsFromServer();
    },

    getLink(text, pageNumber){
        if(pageNumber){
            return(
                <Link to="page" params={{pageNo:pageNumber}}>{text}</Link>
            );
        }else{
            return '';
        }
    },

    render: function() {
        console.log('rendering page... ' + this.getCurrentPage());
        var postNodes = this.state.data.map(function (post){
            return (
                <Post written_by={post.written_by}>{post.content}</Post>
            );
        });

        return (
            <main>
                {postNodes}
                {this.getLink('Previous', this.getPreviousPage())} 
                {this.getLink('Next', this.getNextPage())}
            </main>
        )
    }
});

var routes = (
  <Route name="home" path="/">
    <Route handler={PostList}/>
    <Route name="page" path="/page/:pageNo" handler={PostList}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
