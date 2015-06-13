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

    stopEdit: function() {
        this.setState({
            editMode: false
        });
    },

    getEditMode: function(){
        if(this.state.editMode){
            return this.state.editMode;
        }else{
            return false
        }
    },

    saveAndStopEdit: function(){
    },

    save: function(){
    },

    render: function() {
        return (
            <div>
                <article contentEditable={this.getEditMode()} ref="myContent">
                    {this.props.children}
                </article>
                <span class='author'>
                    by <strong>{this.props.username}</strong>
                </span>
                <input type='button' onClick={this.startEdit} value='Edit' />
                <input type='button' onClick={this.stopEdit} value='Save' />
            </div>
        );
    }
});

module.exports = Post;
