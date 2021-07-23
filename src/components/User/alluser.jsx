import React, { Component } from 'react';
import { Button, Card, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
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
    handleDelete = event => {
        const id = event.target.value;
        console.log(id);
        this.adminDeleteUserFetch(id);  
    }
    adminDeleteUserFetch = id => {
        fetch("http://localhost:8080/api/users/" + id, {
            method: "DELETE",
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
                {users.map(user => (
                    <Card className='post card'>
                    <Card.Body>
                        <div className='row'>
                            <div className='col-sm-10'>
                                <b><Nav.Link className="user" href={"/userdetail/" + user.id}>{user.email}</Nav.Link></b>
                                <span>{user.firstname}</span><br/>
                                <span>{user.lastname}</span>
                            </div>
                            <div className="col-sm-1">
                                <Button href={'/post/'} value={user} className="btn btn-warning">Edit</Button>
                            </div>
                            <div className="col-sm-1">
                                <Button onClick={this.handleDelete} value={user.id} className="btn btn-danger">Delete</Button>
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