import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import ReactJsAlert from "reactjs-alert";
class PostEdit extends Component {
    state = { 
        'categoryId' : 1,
            'title':'',
            'content': '',
            'url': '',
            'tag': '',
            category:'',
            categories: [],
            message: '',
            success: false
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
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/api/posts/" + id)
          .then(res => res.json())
          .then(
            (result) => {
                if (result.content){
                    this.setState({
                        title: result.title,
                        content: result.content,
                        isActive: result.isActive,
                        url: result.url,
                        tags: result.tags,
                        user: result.user,
                        category: {
                            value: result.category.id,
                            lable: result.category.name },
                        categoryId: result.category.id,                       
                      });
                    const tag = this.state.tags.map(e=>e.name).join(',');
                    this.setState({
                        tag:tag
                    })
                }
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
            'categoryId': this.state.category.value,
            'title':this.state.title,
            'content': this.state.content,
            'url': this.state.url,
            'tags': this.state.tag.split(',')
        }
        this.userUpdatePostFetch(post);        
    }
    userUpdatePostFetch = post => {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/api/posts/"+id, {
            method: "PUT",
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
                    this.setState({success: true})
                }
                else {
                    const {title, content, tag} = this.state;
                    var message = !title&&'Title'||!content&&'Content'||!tag&&'Tags';
                    console.log(message);
                    this.setState({
                        message: message
                    })
                }
            });
    }
    render() { 
        console.log(this.state);
        const categories = this.state.categories;
        const options = [];
        categories.map(category => (
            options.push({ value: category.id, label:category.name})
        ));
        return ( 
            <div>   
                {this.state.message&& <div className='text-error'>{this.state.message} must not null!</div>}
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
                        options={options}/>
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
                    <Button onClick={this.handleSubmit} variant="primary" type="submit">Update</Button>
                </Form>
            </div>
         );
    }
}
 
export default PostEdit;