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
            editMode: this.props.edit || false,
            who: this.props.post.who,
            where: this.props.post.where,
            when: this.props.post.when
        };
    },

    startEdit: function() {
        this.setState({
            editMode: true
        });
    },

    stopEdit: function(updateState) {
        var updateState = updateState || false;
        console.log("... stop");

        var state = {
            editMode: false
        }

        if(updateState){
            state['who'] = this.getWho();
            state['where'] = this.getWhere();
            state['when'] = this.getWhen();
        }

        this.setState(state);
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

    getWho: function(){
        return React.findDOMNode(this.refs.who).value;
    },

    getWhere: function(){
        return React.findDOMNode(this.refs.where).value;
    },

    getWhen: function(){
        return React.findDOMNode(this.refs.when).value;
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
        json['who'] = this.getWho();
        json['where'] = this.getWhere();
        json['when'] = this.getWhen();
        console.log(json);
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
        this.save(this.stopEditAndUpdate);
    },

    save: function(success, error){
        console.log('... save');
        var saveCall = this.buildSaveCall(success, error);
        $.ajax(saveCall);
    },

    stopEditAndUpdate: function(){
        this.stopEdit(true);
    },

    getContextLine: function(){
        var where = '';
        if(this.state.where){
            where = (
                <span class='where'>{this.state.where}</span>
            )
        }

        var who = '';
        if(this.state.who){
            who = (
                <span class='who'>{this.state.who}</span>
            )
        }

        var when = '';
        if(this.state.when){
            when = (
                <span class='when'>{this.state.when}</span>
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

    getEditContextLine: function(){
        return (
            <div class='context'>
                Who: <input type='text' ref='who' defaultValue={this.state.who}/><br/>
                Where: <input type='text' ref='where' defaultValue={this.state.where}/><br/>
                When: <input type='text' ref='when' defaultValue={this.state.when}/>
            </div>
        )
    },

    render: function() {

        return (
            <div>
                <article contentEditable={this.getEditMode()} ref="myContent"
                dangerouslySetInnerHTML={{__html:this.props.children}} />
                { this.getEditMode() ? this.getEditContextLine() :
                                       this.getContextLine() }
                { !this.getEditMode() ? <span class='author'>by <strong>{this.props.username}</strong></span> :
                                        '' }
                { this.getEditMode() ? <input type='button' onClick={this.saveAndStopEdit} value='Save' /> :
                                       <input type='button' onClick={this.startEdit} value='Edit' /> }
            </div>
        );
    }
});

module.exports = Post;
