'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var PostList = React.createClass({
    render: function() {
        return (
            <div className='notenote-postlist'>
                <RouteHandler/>
            </div>
        )
    }
});

module.exports = PostList;
