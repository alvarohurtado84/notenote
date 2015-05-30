/** @jsx React.DOM */
var React = require('react');


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

module.exports = Post;
