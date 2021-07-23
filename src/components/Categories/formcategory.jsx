import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form } from 'react-bootstrap';
class CategoryForm extends Component {
    state = { 
        name:'',
        message: '' }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    handleSubmit = event => {
        event.preventDefault()
        this.adminAddCategoryFetch(this.state)  
    }
    adminAddCategoryFetch = category => {
        fetch("http://localhost:8080/api/categories", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(category)
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.status===400){
                    this.setState({
                        message: 'Category is exist'
                    })
                }
          })       
    }
    render() { 
        return ( 
            <div className='formCenter'>
                <div className='text-error'>{this.state.message}</div>
                <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Category name</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="name"
                    value={this.state.name} 
                    onChange={this.handleChange} 
                    placeholder="Enter catogory" />
                </Form.Group>
                <Button onClick={this.handleSubmit}  variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
            </div>
        );
    }
}
 
export default CategoryForm;