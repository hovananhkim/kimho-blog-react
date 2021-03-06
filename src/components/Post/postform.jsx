import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form } from 'react-bootstrap';
import ReactJsAlert from "reactjs-alert";
import Select from 'react-select';
import { message } from 'antd';
class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'categoryId' : 1,
            'title':'',
            'content': '',
            'url': '',
            'tag': '',
            category: '',
            categories: [],
            message: '',
            success: false
        };
    }
    
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
    selectChange = category => {
        this.setState({
          category
        });
    }
    handleSubmit = event => {
        event.preventDefault()
        const post = {
            'categoryId' : this.state.category.value,
            'title':this.state.title,
            'content': this.state.content,
            'url': this.state.url,
            'tags': this.state.tag.split(',')
        }
        this.userAddPostFetch(post);        
    }
    userAddPostFetch = post => {
        fetch("http://localhost:8080/api/posts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(post)
        })
            .then(res => res.json())
            .then(result => {
                    if (result.content){
                        this.setState({
                            success: true
                        })
                        this.setState({
                            'title':'',
                            'content': '',
                            'url': '',
                            'tag': '',
                            'categoryId':1,
                            message: '',
                        })
                    }
                    else {
                        const {category, title, content, tag} = this.state;
                        var message = !category&&'Category'||!title&&'Title'||!content&&'Content'||!tag&&'Tags';
                        this.setState({
                            message: message
                        })
                    }
                }
            )
        
    }
    render() { 
        const categories = this.state.categories;
        const options = [];
        categories.map(category => (
            options.push({ value: category.id, label:category.name})
        ))
        return ( 
            <div >             
                {this.state.message&&<div className='text-error'>{this.state.message} must not null!</div>}
                {this.state.success && <ReactJsAlert
                    status={this.state.success} 
                    type='success' 
                    title= 'Post is created successfullly'
                    Close={() => this.setState({ success: false })}/>}
                <Form>
                    <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Select 
                        value={this.state.category}
                        onChange={this.selectChange}
                        options={options}
                        placeholder="Select Category"
                    />
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
                        as="textarea"
                        rows={10}
                        type="text" 
                        placeholder="Enter content" 
                        name="content"
                        value={this.state.content} 
                        onChange={this.handleChange}
                         />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter image url" 
                        name="url"
                        value={this.state.url} 
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
                    <Button onClick={this.handleSubmit} variant="primary" type="submit">Add</Button>
                </Form>
            </div>
        );
    }
}
 
export default PostForm;