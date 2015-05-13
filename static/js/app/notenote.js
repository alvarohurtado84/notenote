
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


var PostList = React.createClass({

    getInitialState: function(){
        return {data: []};
    },

    loadPostsFromServer: function(){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function(){
        this.loadPostsFromServer();
    },

    render: function() {
        var postNodes = this.state.data.map(function (post){
            return (
                <Post written_by={post.written_by}>{post.content}</Post>
            );
        });

        return (
            <div className='notenote-postlist'>
                {postNodes}
            </div>
        )
    }
});


React.render(
<PostList url='http://localhost:8000/api/posts/' />,
    document.getElementById('content')
);
