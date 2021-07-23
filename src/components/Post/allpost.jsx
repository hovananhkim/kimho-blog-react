import React, { Component } from 'react';
import { Card, Button} from 'react-bootstrap';
class AllUser extends Component {
    state = {
        isLoader: false,
        posts: []
    };
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
                  <Card className='post'>
                  <Card.Body>
                      <div className="row">
                          <div className="col-sm-10">
                              <b>{post.user.email}</b>
                              <h6>{post.title}</h6>
                              <pre>{post.content}</pre>
                          <div className="font-date"><b>Create at: </b>{post.createDate}</div>
                          </div> 
                          <div className="col-sm-1">
                              <Button href={'/post/'+post.id} value={post} className="btn btn-warning">Edit</Button>
                          </div>
                          <div className="col-sm-1">
                              <Button onClick={this.handleDelete} value={post.id} className="btn btn-danger">Delete</Button>
                          </div>
                              
                      </div>  
                  </Card.Body>    
              </Card>
              ))}
            </div>
         );
    }
}
 
export default AllUser;