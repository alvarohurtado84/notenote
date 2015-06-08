/** @jsx React.DOM */
var React = require('react');


var Post = React.createClass({

    getInitialState: function() {
        return {};
    },

    startEdit: function() {
        this.setState({
            editMode: true
        });
    },

    getEditMode: function(){
        if(this.state.editMode){
            return this.state.editMode;
        }else{
            return false
        }
    },

    render: function() {
        return (
            <div>
                <article onClick={this.startEdit} contentEditable={this.getEditMode()} ref="myContent">
                    {this.props.children}
                </article>
                <span class='author'>
                    by <strong>{this.props.written_by}</strong>
                </span>
            </div>
        );
    }
});

module.exports = Post;
