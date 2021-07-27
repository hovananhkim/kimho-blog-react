import React, { Component } from 'react';
import { Button, NavLink, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
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
    };
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
    handleActive = event => {
        const id = event.target.value;
        this.adminActivePostFetch(id);  
    }

    adminActivePostFetch = id => {
        fetch("http://localhost:8080/api/posts/"+id+"/active", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
        });
        window.location.reload();  
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
        var posts = this.state.posts.sort(function (a, b) {
            return b.id - a.id;
          });
        return ( 
            <div>
                <Link to={'/admin/post/add'}><Button  className="btn btn-primary margin button-add" type='button'>Add Post</Button></Link>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th style= {{width:'40px'}}>Id</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th style= {{width:'80px'}}>Status</th>
                    <th style= {{width:'80px'}}>Active</th>
                    <th style= {{width:'80px'}}>Edit</th>
                    <th style= {{width:'80px'}}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                    <tr>
                        <td>{post.id}</td>
                        <td><NavLink href={'/posts/'+post.id}>{post.title}</NavLink></td>
                        <td><NavLink href={'/users/'+post.user.id}>{post.user.email}</NavLink></td>
                        <td>{post.category.name}</td>
                        {!post.isActive&&<td>Unactive</td>}
                        {post.isActive&&<td>Active</td>}
                        <td>
                           <Button onClick={this.handleActive} value={post.id}>Change</Button>                        </td>
                        <td>
                            <Button href={'/admin/post/'+post.id+'/edit'} value={post} className="btn btn-warning">Edit</Button>
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
 
export default AllUser;