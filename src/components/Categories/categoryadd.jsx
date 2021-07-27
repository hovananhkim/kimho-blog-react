import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form} from 'react-bootstrap';
import ReactJsAlert from "reactjs-alert"
class CategoryForm extends Component {
    state = { 
        name:'',
        message: '',
        success: false,
        error: false
     }
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
                    if (!category.name){
                        this.setState({
                            message: 'Name must not null!',
                            error: true
                        })
                    }else{
                    this.setState({
                        message: 'Category is exist!',
                        error: true
                    })}
                }else {
                    this.setState({
                        success: true
                    })
                    this.setState({
                        name:'',
                        message: '',
                    }); 
                }
                })
    }
    render() { 
        return ( 
            <div className='formCenter'>
                {this.state.error && 
                    <ReactJsAlert
                    status={this.state.error} 
                    type='error' // success, warning, error, info
                    title= {this.state.message}
                    Close={() => this.setState({ error: false })}/>}
                {this.state.success && <ReactJsAlert
                    status={this.state.success} 
                    type='success' // success, warning, error, info
                    title= 'Category is created successfullly'
                    Close={() => this.setState({ success: false })}/>}
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
                    Add
                </Button>
                </Form>
            </div>
        );
    }
}
 
export default CategoryForm;