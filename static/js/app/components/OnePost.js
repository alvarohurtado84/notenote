var React = require('react');
var Link = require('react-router').Link;
var $ = require('jQuery');

// Utils
var formatUnicorn = require('format-unicorn/safe');

// Notenote.co components
var Post = require('./Post');

// config variables
var getPostUrl = require('../config').getPostUrl;

var OnePost = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function(){

        console.log("Params ONEPOST: " + this.context.router.getCurrentParams().postId + ' ----- ' + this.context.router.getCurrentParams().writtenBy)

        return {
            id: this.context.router.getCurrentParams().postId,
            writtenBy: this.context.router.getCurrentParams().writtenBy,
            post: {}
        };
    },

    getUrl: function(page){
        return formatUnicorn(
            getPostUrl,
            {
                id: this.state.id,
                writtenBy: this.state.writtenBy
            }
        );
    },

    loadPostFromServer: function(page){
        console.log('load from server... ' + this.getUrl());
        var url = this.getUrl(page);
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(post){
                this.setState({
                    post: post
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function(){
        console.log('component did mount...');
        this.loadPostFromServer();
    },

    render: function() {
        return (
            <main>
                <Link to='newPost'>New post</Link>
                <Post username={this.state.post.username} myId={this.state.post.id} post={this.state.post}>{this.state.post.content}</Post>
            </main>
        )
    }
});


module.exports = OnePost;
