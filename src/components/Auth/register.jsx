import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import './login.css';
class Register extends Component {
    state = {
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        message: ''
      }
    handleSubmit = event => {
        event.preventDefault()
        this.userRegisterFetch(this.state)  
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    userRegisterFetch = user => {
        fetch("http://localhost:8080/api/register", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(user)
        })
          .then(resp => resp.json())
          .then(data => {
            console.log(data);
            if(data.email){
                this.props.history.push('/login');
            }else if(data.status===400){
                if (!this.state.email){
                this.setState({message: 'Email must not emty'})
              }
                else if (!this.state.password){
                this.setState({message: 'Password must not emty'})
              }
                else this.setState({message: 'Email valid'})
            }
          })       
    }
    render() { 
        return (  
            <div className="formCenter">
                <Form>
                    <h5 className="text-center">Register</h5>
                    <div className="text-error">{this.state.message}</div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        name="email"
                        value={this.state.email} 
                        onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control 
                        type="text"     
                        placeholder="Enter firstname" 
                        name="firstname"
                        value={this.state.firstname} 
                        onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter lastname" 
                        name="lastname"
                        value={this.state.lastname} 
                        onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button onClick={this.handleSubmit} variant="primary" type="submit">
                    Submit
                    </Button>
                </Form>
            </div>
        );
    }
}
 
export default Register;