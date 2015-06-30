var React = require('react');
var $ = require('jQuery');

var Post = require('./Post');

/*
 * CreatePost renders an empty form to create a new Post.
 */
var CreatePost = React.createClass({

    getInitialState: function() {
        return {}
    },

    render: function() {
        return (
            <main>
                <Post edit='true' />
            </main>
        );
    }
});

module.exports = CreatePost;
