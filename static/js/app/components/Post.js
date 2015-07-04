var React = require('react');
var cookie = require('react-cookie');
var $ = require('jQuery');

// Utils
var formatUnicorn = require('format-unicorn/safe');

// config variables
var updatePostUrl = require('../config').updatePostUrl;
var postsUrl = require('../config').postsUrl;

var Post = React.createClass({

    getInitialState: function() {
        return {
            editMode: this.props.edit || false
        };
    },

    startEdit: function() {
        this.setState({
            editMode: true
        });
    },

    stopEdit: function() {
        console.log("... stop");
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

    getSaveUrl: function(){
        var url;
        if(this.getId()){
            url = formatUnicorn(updatePostUrl, {id: this.getId()});
        }else{
            url = postsUrl;
        }
        return url;
    },

    getContent: function(){
        return React.findDOMNode(this.refs.myContent).innerHTML;
    },

    getSaveHeaders: function(){
        var headers = {
            'X-CSRFToken': cookie.load("csrftoken")
        }

        // if the post already exist (so it has an id)
        if(this.getId()){
            headers['X-HTTP-Method-Override'] = 'PUT';
        }

        return headers;
    },

    getId: function(){
        if(this.props.myId){
            return this.props.myId;
        }else{
            return false;
        }
    },

    buildJSON: function(){
        var json = {};
        json['content'] = this.getContent();
        return json;
    },

    buildSaveCall: function(success, error){
        var onSuccess = success || function(){};
        var onError = error || function(){};
        var data = this.buildJSON();
        var url = this.getSaveUrl();
        var headers = this.getSaveHeaders()
        return {
            url: url,
            data: data,
            dataType: 'json',
            headers: headers,
            method: 'POST',
            success: onSuccess,
            error: onError
        };
    },

    saveAndStopEdit: function(){
        console.log('save and stoping...');
        this.save(this.stopEdit);
    },

    save: function(success, error){
        console.log('... save');
        var saveCall = this.buildSaveCall(success, error);
        $.ajax(saveCall);
    },

    getContextLine: function(){
        var where = '';
        if(this.props.post.where){
            where = (
                <span class='where'>{this.props.post.where}</span>
            )
        }

        var who = '';
        if(this.props.post.where){
            who = (
                <span class='who'>{this.props.post.who}</span>
            )
        }

        var when = '';
        if(this.props.post.when){
            when = (
                <span class='when'>{this.props.post.when}</span>
            )
        }

        return (
            <div class='context'>
                { who ? 'by ' : ''}{ who ? who : '' }
                { where ? ' in ' : ''}{ where ? where : '' }
                { when ? ' in ' : ''}{ when ? when : '' }
            </div>
        )
    },

    render: function() {
        var renderedSave = (<input type='button' onClick={this.saveAndStopEdit} value='Save' />);
        var renderedEdit = '';
        if(!this.getEditMode()){
            renderedEdit = (<input type='button' onClick={this.startEdit} value='Edit' />);
        }

        return (
            <div>
                <article contentEditable={this.getEditMode()} ref="myContent"
                dangerouslySetInnerHTML={{__html:this.props.children}} />
                {this.getContextLine()}
                <span class='author'>
                    by <strong>{this.props.username}</strong>
                </span>
                {renderedEdit}
                {renderedSave}
            </div>
        );
    }
});

module.exports = Post;
