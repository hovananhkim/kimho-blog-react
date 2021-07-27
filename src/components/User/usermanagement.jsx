import React, { Component } from 'react';
import { Button, Card, Nav, NavLink, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom';
class AllUser extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoader: false,
            users: []
        };
    }
    componentDidMount() {
        fetch("http://localhost:8080/api/users", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }})
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                users: result
              });
            }) 
    }
    handleBlock = event => {
        const id = event.target.value;
        this.adminBlockUserFetch(id);  
    }
    adminBlockUserFetch = id => {
        fetch("http://localhost:8080/api/users/" + id+"/block", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }});
        window.location.reload();
    }
    handleUnBlock = event => {
        const id = event.target.value;
        this.adminUnBlockUserFetch(id);  
    }
    adminUnBlockUserFetch = id => {
        fetch("http://localhost:8080/api/users/" + id+"/unblock", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }});
        window.location.reload();
    }
    render() {
      var {users} = this.state;
        return ( 
            <div>
                <Link to='/register'><Button  className="button-add margin" type='button'>Add User</Button></Link>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th style= {{width:'40px'}}>Id</th>
                    <th>Username</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th style= {{width:'200px'}}>Role</th>
                    <th style= {{width:'80px'}}>Posts</th>
                    <th style= {{width:'80px'}}>Status</th>
                    <th style= {{width:'104px'}}>Block</th>
                    <th style= {{width:'80px'}}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                    <tr>
                        <td>{user.id}</td>
                        <td><NavLink href={'/users/'+user.id}>{user.email}</NavLink></td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>
                            <div>{user.roles.length===1&&'ROLE_USER'}</div>
                            <div>{user.roles.length===2&&'ROLE_ADMIN'}</div>
                        </td>
                        <td>
                            {user.posts.length}
                        </td>
                        <td>
                            <div>{user.roles.length>=1&&'ACTIVE'}</div>
                            <div>{user.roles.length===0&&'BLOCK'}</div>
                        </td>
                        <td>
                            {user.roles.length===0&&<Button onClick={this.handleUnBlock} value={user.id} className="btn btn-danger">UnBlock</Button>}
                            {user.roles.length===1&&<Button onClick={this.handleBlock} value={user.id} className="btn btn-danger">Block</Button>}
                        </td>
                        <td>
                            <Button href={'/admin/user/'+user.id+'/edit'} value={user} className="btn btn-warning">Edit</Button>
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