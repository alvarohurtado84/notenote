'use strict';

var $            = require('jquery');
var React        = require('react');
var Router       = require('react-router');
var Post         = require('./Post.jsx');
var url          = require('./config.json').url;

// Setting routing settings
var Link         = Router.Link;

var Page = React.createClass({
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
        var pageToLoad = page || this.state.currentPage;
        if(pageToLoad){
            url += '?page=' + pageToLoad;
        }
        return url;
    },

    getPreviousPage: function(){
        if(this.state.hasPrevious && this.state.currentPage > 1){
            return this.state.currentPage - 1;
        }
    },

    getNextPage: function(){
        if(this.state.hasNext){
            return this.state.currentPage + 1;
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
        console.log('rendering page... ' + this.state.currentPage);
        var postNodes = this.state.data.map(function (post){
            return (
                <Post written_by={post.written_by}>{post.content}</Post>
            );
        });

        return (
            <div>
                {postNodes}
                {this.getLink('Previous', this.getPreviousPage())}
                {this.getLink('Next', this.getNextPage())}
            </div>
        )
    }
});


module.exports = Page;
