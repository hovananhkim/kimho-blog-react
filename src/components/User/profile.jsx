import React, { Component } from 'react';
import { Button, Form  } from 'react-bootstrap';
import ReactJsAlert from "reactjs-alert";
import 'bootstrap/dist/css/bootstrap.css'
import '../Post/post.css';
import './user.css';
import avatar from './avatar.png';
class Profile extends Component {
    state = {
        id: 0,
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        success: false,
        message:''
    };
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
                id: result.id,
                email: result.email,
                firstname: result.firstname,
                lastname: result.lastname,
                isAdmin: userFromToken.scopes==="ROLE_ADMIN,ROLE_USER"
            });
        })
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.newpassword){
            this.setState({
                password:this.state.newpassword
            })
        }
        this.updateUserFetch(this.state);
    }
    updateUserFetch = user => {
        const id = this.state.id;
        fetch("http://localhost:8080/api/users/"+id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(user)
        })
            .then(resp => resp.json())
            .then(data => {
                if(data.email){
                    this.setState({
                        success: true
                    })}
                else if (data.status===400){
                    this.setState({
                        message: 'Password must not null'
                    })
                }
                })       
    }
    render() { 
        const user = this.state;
        return ( 
            <div>    
                {this.state.success && <ReactJsAlert
                    status={this.state.success} 
                    type='success' 
                    title= 'Post is created successfullly'
                    Close={() => this.setState({ success: false })}/>}       
                <div>
                    <div className="card-user">
                    <img src={avatar} alt="Avatar" className="avatar"/><br/>
                    <b>{user.email}</b>
                    <div>{user.firstname} {user.lastname}</div>
                    </div>
                    <div className="formCenter">
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control 
                        type="text"     
                        placeholder={user.firstname}
                        name="firstname"
                        value={this.state.firstname} 
                        onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder={user.lastname} 
                        name="lastname"
                        value={this.state.lastname} 
                        onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="********" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.handleChange}/>
                    </Form.Group>
                    <div className="text-error">{this.state.message}</div>
                    <Button className='button-add' onClick={this.handleSubmit} variant="primary" type="submit">
                    Update
                    </Button>
                </Form>
                </div>
                </div>
                
            </div>
        );
    }
}
 
export default Profile;