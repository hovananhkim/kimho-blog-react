import React, { Component } from 'react';
import { Table, Button, NavLink} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
class PostOfUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoaded: false
        };
    }
    componentDidMount() {
        const base64Url = localStorage.token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const userFromToken =  JSON.parse(window.atob(base64));
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
                posts: result.posts,
            });
        })
    }
    handleDelete = event => {
        const id = event.target.value;
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this post.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.userDeletePostFetch(id)
              },
              {
                label: 'No'
              }
            ]
          });    
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
        const {posts }= this.state;
        return (  
            <div>
                <Link to='/user/post/add'><Button  className="btn btn-primary margin button-add" type='button'>Add Post</Button></Link>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th style= {{width:'40px'}}>Id</th>
                    <th>Title</th>
                    <th style= {{width:'80px'}}>Status</th>
                    <th style= {{width:'80px'}}>Edit</th>
                    <th style= {{width:'80px'}}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                    <tr>
                        <td>{post.id}</td>
                        <td><NavLink href={'/posts/'+post.id}>{post.title}</NavLink></td>
                        {!post.isActive&&<td>Unactive</td>}
                        {post.isActive&&<td>Active</td>}
                        <td>
                            <Button href={'/user/post/'+post.id+'/edit'} value={post} className="btn btn-warning">Edit</Button>
                        </td>
                        <td>
                        <Button onClick={this.handleDelete} value={post.id} className="btn btn-danger">Delete</Button>
                        </td>
                    </tr>
                    ))}     
                </tbody>
                </Table>
            </div>
        );
    }
}
 
export default PostOfUser;