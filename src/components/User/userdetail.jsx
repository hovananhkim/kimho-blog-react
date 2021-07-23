import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import '../Post/post.css';
import './user.css';
import avatar from './avatar.png';
class UserDetail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoader: false,
            user: {},
            posts: [],
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/api/users/" + id)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                user: result,
                posts: result.posts
              });
            })
    }
    render() { 
        var user = this.state.user;
        var posts = this.state.posts;
        return ( 
            <div >
                <div className="card-user">
                <img src={avatar} alt="Avatar" className="avatar"/><br/>
                <b>{user.email}</b>
                <div>{user.firstname} {user.lastname}</div>
                </div>
                <div>
                {posts.map(post => (
                <Card className='post'>
                <Card.Body>
                      <h6>{post.title}</h6>
                      <pre>{post.content}</pre>
                      <div className="font-date"><b>Create at: </b>{post.createDate}</div>
                    </Card.Body>
                </Card>
                ))}
                </div>
            </div>
        );
    }
}
 
export default UserDetail;