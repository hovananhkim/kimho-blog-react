import React, { Component } from 'react';
import { Button  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import '../Post/post.css';
import './user.css';
import avatar from './avatar.png';
import PostManager from '../Post/postmanager';
import { Link, Route } from 'react-router-dom';
import Admin from './alluser';
class UserManager extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoader: false,
            user: {},
            posts: [],
            isAdmin: false
        };
    }
    componentDidMount() {
        const base64Url = localStorage.token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const userFromToken =  JSON.parse(window.atob(base64));
        console.log()
            fetch("http://localhost:8080/api/users/find?email=" + userFromToken.sub,
                {headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.token
                }})
            .then(res => res.json())
            .then(
                (result) => {
                this.setState({
                    isLoaded: true,
                    user: result,
                    posts: result.posts,
                    isAdmin: userFromToken.scopes==="ROLE_ADMIN,ROLE_USER"
                });
            })
    }
    render() { 
        const user = this.state.user;
        const posts = this.state.posts;
        return ( 
            <div >
                
                <div>
                    <div className="card-user">
                    <img src={avatar} alt="Avatar" className="avatar"/><br/>
                    <b>{user.email}</b>
                    <div>{user.firstname} {user.lastname}</div>
                    </div>
                    {!this.state.isAdmin &&  <div>
                    <Link to='/addpost'><Button  className="btn btn-primary" type='button'>Add Post</Button></Link>
                    {posts.map(post => (
                        <PostManager  value={post}/>
                    ))}
                    </div>}
                    {this.state.isAdmin && 
                        <div className="row">
                            <div className='col-sm-2'>
                                <Link to='/posts'><Button  className="btn btn-primary margin" type='button'>Manage Post</Button></Link>
                                <Link to='/categories'><Button  className="btn btn-primary margin" type='button'>Manage Category</Button></Link>
                                <Link to='/users'><Button  className="btn btn-primary margin" type='button'>Manage User</Button></Link>
                            </div>
                            <div className='col-sm-2'>
                            <Link to='/addpost'><Button  className="btn btn-primary margin" type='button'>Add Post</Button></Link>
                            <Link to='/addcategory'><Button  className="btn btn-primary margin" type='button'>Add Category</Button></Link>
                            <Link to='/register'><Button  className="btn btn-primary margin" type='button'>Add User</Button></Link>
                            </div>
                            
                        </div>
                    }
                </div>
                
            </div>
        );
    }
}
 
export default UserManager;