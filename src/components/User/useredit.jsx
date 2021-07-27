import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import ReactJsAlert from "reactjs-alert";
class UserEdit extends Component {
    state = {  
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        message: ''
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/api/users/" + id)
          .then(res => res.json())
          .then(
            (result) => {
                if (result.email){
                    this.setState({
                        email: result.email,
                        firstname: result.firstname,
                        lastname: result.lastname,
                      });
                }
            }) 
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        this.adminUpdateUserFetch(this.state);
    }
    adminUpdateUserFetch = user => {
        const id = this.props.match.params.id;
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
                else if(data.status===400){
                    this.setState({
                        message: 'Pass must not null!'
                    })
                }
                })       
    }
    render() { 
        return ( 
            <div className="formCenter">
            <div className='text-error'>{this.state.message}</div>
            {this.state.success && <ReactJsAlert
                status={this.state.success} 
                type='success' 
                title= 'User is update successfullly'
                Close={() => this.setState({ success: false })}/>}
            <Form >
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>Firstname</Form.Label>
                <Form.Control 
                    type="text"     
                    name="firstname"
                    value={this.state.firstname} 
                    onChange={this.handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Lastname</Form.Label>
                <Form.Control 
                    type="text" 
                    name="lastname"
                    value={this.state.lastname} 
                    onChange={this.handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control 
                    type="password" 
                    name="password" 
                    placeholder='********'
                    value={this.state.password} 
                    onChange={this.handleChange}/>
                </Form.Group>
                <Button className='button-add' onClick={this.handleSubmit} variant="primary" type="submit">
                Update
                </Button>
            </Form>
            </div>
         );
    }
}
 
export default UserEdit;