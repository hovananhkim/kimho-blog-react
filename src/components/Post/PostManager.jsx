import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Button, Nav } from 'react-bootstrap';
import './post.css';
class PostManager extends Component {
    state = {
        post: this.props.value
    }
    handleDelete = event => {
        const id = event.target.value;
        this.userDeletePostFetch(id);  
    }
    userDeletePostFetch = id => {
        fetch("http://localhost:8080/api/posts/"+id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
        });
        window.location.reload();  
    }
    render() { 
        const post = this.state.post;
        return ( 
            <Card className='post'>
                <Card.Body>
                    <div className="row">
                        <div className="col-sm-10">
                        {post.user && <b><Nav.Link className="user" href={"/users/" + post.user.id}>{post.user.email}</Nav.Link></b>}
                            <h6>{post.title}</h6>
                            <pre>{post.content}</pre>
                        <div className="font-date"><b>Create at: </b>{post.createDate}</div>
                        </div> 
                        <div className="col-sm-1">
                            <Button onClick={this.updateHandle} value={post.id} className="btn btn-warning">Edit</Button>
                        </div>
                        <div className="col-sm-1">
                            <Button onClick={this.handleDelete} value={post.id} className="btn btn-danger">Delete</Button>
                        </div>
                            
                    </div>  
                </Card.Body>    
            </Card>
         );
    }
}
 
export default PostManager;