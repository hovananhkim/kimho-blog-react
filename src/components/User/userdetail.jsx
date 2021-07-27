import React, { Component } from 'react';
import { Card, NavLink, Table } from 'react-bootstrap';
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
        console.log(posts);
        return ( 
            <div >
                <div className="card-user">
                <img src={avatar} alt="Avatar" className="avatar"/><br/>
                <b>{user.email}</b>
                <div>{user.firstname} {user.lastname}</div>
                </div>
                <div>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th style= {{width:'40px'}}>Id</th>
                    <th>Title</th>
                    <th style= {{width:'80px'}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                    <tr>
                        
                        {post.isActive&& <td>{post.id}</td>}
                        {post.isActive&& <td><NavLink href={'/posts/'+post.id}>{post.title}</NavLink></td>}
                        {post.isActive&& <td>Active</td>}
                    </tr>
                    ))}     
                </tbody>
                </Table>
                </div>
            </div>
        );
    }
}
 
export default UserDetail;