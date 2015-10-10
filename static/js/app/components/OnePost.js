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

        console.log("Params ONEPOST: " + this.context.router.getCurrentParams().username + ' ----- ' + this.context.router.getCurrentParams().slug)

        return {
            slug: this.context.router.getCurrentParams().slug,
            username: this.context.router.getCurrentParams().username,
            post: {}
        };
    },

    getUrl: function(page){
        return formatUnicorn(
            getPostUrl,
            {
                slug: this.state.slug,
                username: this.state.username
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
                <Post username={this.state.post.username} slug={this.state.post.slug} post={this.state.post}>{this.state.post.content}</Post>
            </main>
        )
    }
});


module.exports = OnePost;
