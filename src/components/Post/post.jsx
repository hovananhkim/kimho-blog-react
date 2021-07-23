import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Nav } from 'react-bootstrap';
import './post.css';
class Post extends Component {
    state = {
        post: this.props.value
    }
    render() { 
        const post = this.state.post;
        return ( 
            <Card className='post card'>
                <Card.Body>
                    <b><Nav.Link className="user" href={"/userdetail/" + post.user.id}>{post.user.email}</Nav.Link></b>
                    <h6>{post.title}</h6>
                    <pre>{post.content}</pre>
                    <div className="font-date"><b>Create at: </b>{post.createDate}</div>
                </Card.Body>
            </Card>
        );
    }
}
 
export default Post;