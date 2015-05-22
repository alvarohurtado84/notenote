var React = require('react');

var Post = React.createClass({
    render: function() {
        return (
            <div className='notenote-post'>
                {this.props.children}
                <br/>
                <span class='author'>
                    by {this.props.written_by}
                </span>
            </div>
        );
    }
});

module.exports = Post;

