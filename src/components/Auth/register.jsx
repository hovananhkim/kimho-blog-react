import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import ReactJsAlert from "reactjs-alert"
import './login.css';
class Register extends Component {
    state = {
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        success: false,
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
            if(data.email){
                this.setState({
                  success: true
                })
                this.setState({
                  email: '',
                  firstname: '',
                  lastname: '',
                  password: '',
                  message: ''
                })
            }else if(data.status===400){
                if (!this.state.email){
                this.setState({message: 'Email must not null'})
              }
                else if (!this.state.password){
                this.setState({message: 'Password must not null'})
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
                    {this.state.success && <ReactJsAlert
                    status={this.state.success} 
                    type='success'
                    title= 'User is created successfullly'
                    Close={() => this.setState({ success: false })}/>}
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
                    <Button className='button-add' onClick={this.handleSubmit} variant="primary" type="submit">
                    Submit
                    </Button>
                </Form>
            </div>
        );
    }
}
 
export default Register;