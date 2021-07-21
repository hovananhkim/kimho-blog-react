import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form } from 'react-bootstrap';
class PostForm extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="formCenter">
                <Form>
                    <h5 className="text-center">Add post</h5>
                    <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        name="email"
                        value={this.state.email} 
                        onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text"     
                        placeholder="Enter title" 
                        name="firstname"
                        value={this.state.firstname} 
                        onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Content</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter lastname" 
                        name="lastname"
                        value={this.state.lastname} 
                        onChange={this.handleChange} />
                    </Form.Group>
                    
                    <Button onClick={this.handleSubmit} variant="primary" type="submit">Add</Button>
                </Form>
            </div>
        );
    }
}
 
export default PostForm;