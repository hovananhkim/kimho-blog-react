import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import ReactJsAlert from "reactjs-alert";
class CategoryEdit extends Component {
    state = { 
        id: 0,
        name:'',
        success: false,
        error: false,
        message: '' 
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/api/categories/" + id)
          .then(res => res.json())
          .then(
            (result) => {
                if (result.name){
                    this.setState({
                        name: result.name
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
        event.preventDefault()
        this.adminUpdateCategoryFetch(this.state)  
    }
    adminUpdateCategoryFetch = category => {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/api/categories/"+id, {
            method: "PUT",
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
                            error: true,
                            message: 'Name must not null!'
                        })
                    }else {
                        this.setState({
                            error: true,
                            message: 'Category is exist!'
                    })}
                }else {
                    this.setState({
                        success: true
                    })}
                })       
    }

    render() { 
        return ( 
            <div className='formCenter'>
                {this.state.error && 
                    <ReactJsAlert
                    status={this.state.error} 
                    type='error' 
                    title= {this.state.message}
                    Close={() => this.setState({ error: false })}/>}
                {this.state.success && <ReactJsAlert
                    status={this.state.success} 
                    type='success'
                    title= 'Category is updated successfullly'
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
                    Update
                </Button>
                </Form>
            </div>
        );
    }
}
 
export default CategoryEdit;