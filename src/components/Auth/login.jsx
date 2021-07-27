import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './login.css'
import { Form, Button } from 'react-bootstrap';
import Profile from '../User/profile'
class Login extends Component {
    state = {
      email: '',
      password: '',
      message: ''
    }
    handleSubmit = event => {
      event.preventDefault()
      this.userLoginFetch(this.state)  
    }
    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
    userLoginFetch = user => {
        fetch("http://localhost:8080/api/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(user)
        })
          .then(resp => resp.json())
          .then(data => {
            if(data.token){
              localStorage.setItem('token', data.token);
              this.props.history.push('/profile');
              window.location.reload();
            }else {
              if (!this.state.email){
                this.setState({
                  message: 'Email is empty!'
                })
              }
              if (!this.state.password){
                this.setState({
                  message: 'Password is empty!'
                })
              }else
                this.setState({
                message: 'Incorrect email or password!'
              })
            }
          })       
    }
    render() {
      return ( 
        <div className="formCenter">
          <Form>
          <h5 className="text-center">Login</h5>
          <div className="text-error">{this.state.message}</div>
          <div>{this.message}</div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              name="email"
              value={this.state.email} 
              onChange={this.handleChange} 
              placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              name="password" 
              value={this.state.password} 
              onChange={this.handleChange} 
              placeholder="Password" />
          </Form.Group>
          <Button className='button-add' onClick={this.handleSubmit}  variant="primary" type="submit">
            Login
          </Button>
        </Form>
        </div>
      )  
          ;
    }
}

export default Login;