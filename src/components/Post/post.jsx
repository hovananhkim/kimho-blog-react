import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, NavLink } from 'react-bootstrap';
import './post.css';
class Post extends Component {
    state = {
        post: this.props.value
    }
    render() { 
        const post = this.state.post;
        return ( 
            <NavLink href={'/posts/'+post.id}>
                {post.isActive && <Card className='post card text-color'>
                <div className='row card-margin'>
                    <div className='col-sm-6'>
                        <img className='img-post' src={post.url}/>
                    </div>
                    <div className='col-sm-6'>
                        <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>
                        {post.content.split('.')[0]}
                        </Card.Text>
                        <div className='resource'>
                            <NavLink className='text-color author' href={'/users/'+post.user.id}>{post.user.email}</NavLink>
                            <Card.Text className='date'>{post.createDate}</Card.Text>
                        </div>
                        </Card.Body>
                    </div>
                </div> 
                </Card>}
            </NavLink>
        );
    }
}
 
export default Post;