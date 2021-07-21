import React, { Component } from 'react';
import Post from './Post';
import User from '../models/User'
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
      const user = new User();
      console.log(user.getUser());
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