import React, { Component } from 'react';
import Post from '../Post/post';
class Tag extends Component {
    state = { 
        posts: []
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/api/tags/" + id)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                posts: result.posts
              });
            }) 
    }
    render() { 
        const {posts} = this.state;
        return ( 
            <div>
                {posts.map(post => (
                    <Post value={post}/>
                ))}
            </div>
         );
    }
}
 
export default Tag;