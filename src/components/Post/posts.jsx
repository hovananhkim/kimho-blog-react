import React, { Component } from 'react';
import Post from './post';
class Posts extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoader: false,
            posts: []
        };
    }
    componentDidMount() {
        fetch("http://localhost:8080/api/posts")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                posts: result
              });
            }) 
    }
    render() {
      var {posts} = this.state;
        return ( 
            <div>
              {posts.map(post => (
                  <Post key={post.id} value={post}/>
              ))}
            </div>
         );
    }
}
 
export default Posts;