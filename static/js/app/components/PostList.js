var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var $ = require('jQuery');

// Notenote.co components
var Post = require('./Post');

// config variables
var postsUrl = require('../config').postsUrl;

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
        var url = postsUrl;
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
                <Post username={post.username} myId={post.id} post={post}>{post.content}</Post>
            );
        });

        return (
            <main>
                <Link to='newPost'>New post</Link>
                {postNodes}
                {this.getLink('Previous', this.getPreviousPage())}
                {this.getLink('Next', this.getNextPage())}
            </main>
        )
    }
});


module.exports = PostList;
