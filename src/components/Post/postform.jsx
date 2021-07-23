import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form } from 'react-bootstrap';

class PostForm extends Component {
    
    state = {
        'category_id' : 1,
        'title':'',
        'content': '',
        'tag': '',
        categories: []
    };
    componentDidMount() {
        fetch("http://localhost:8080/api/categories")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                categories: result
              });
            })
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    handleSubmit = event => {
        event.preventDefault()
        const post = {
            'categoryId' : this.state.category_id,
            'title':this.state.title,
            'content': this.state.content,
            'tags': this.state.tag.split(',')
        }
        this.userAddPostFetch(post);        
    }
    userAddPostFetch = post => {
        console.log(post);
        fetch("http://localhost:8080/api/posts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(post)
        });
        this.props.history.push('/user');
    }
    render() { 
        var categories = this.state.categories;
        return ( 
            <div >
                <Form>
                    <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <select     
                        value={this.state.category_id} 
                        name='category_id' 
                        onChange={this.handleChange}>
                        
                        {categories.map(category => (
                        <option  value={category.id} >{category.name}</option>
                    ))}
                    </select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text"     
                        placeholder="Enter title" 
                        name="title"
                        value={this.state.title} 
                        onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Content</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter content" 
                        name="content"
                        value={this.state.content} 
                        onChange={this.handleChange}
                         />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter content" 
                        name="tag"
                        value={this.state.tag} 
                        onChange={this.handleChange}
                         />
                    </Form.Group>
                    <Button onClick={this.handleSubmit} variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}
 
export default PostForm;