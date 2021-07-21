import React, { Component } from 'react';
import Post from './Post';
class PostOfCategory extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoader: false,
            posts: []
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/api/categories/" + id)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                posts: result.posts
              });
            }) 
    }
    render() { 
        var posts = this.state.posts;
        return ( 
            <div>
              {posts.map(post => (
                  <Post key={post.id} value={post}/>
              ))}
            </div>
         );
    }
}
 
export default PostOfCategory;