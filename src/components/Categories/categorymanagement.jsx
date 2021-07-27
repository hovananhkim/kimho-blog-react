import React, { Component } from 'react';
import { Button, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
class AllCategory extends Component {
    state = {
        isLoader: false,
        categories: []
    };
    componentDidMount() {
        fetch("http://localhost:8080/api/categories")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                categories: result
              });
            }) 
    }
    handleDelete = event => {
        const id = event.target.value;
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this category.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.adminDeleteCategoryFetch(id)
              },
              {
                label: 'No'
              }
            ]
          });
        
        
    }
    adminDeleteCategoryFetch = id => {
        fetch("http://localhost:8080/api/categories/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }});
        window.location.reload();
    }
    render() { 
        var categories = this.state.categories.sort(function (a, b) {
          return a.id - b.id;
        });
        return ( 
            <div style={{width:'700px'}} className='formCenter'>
                <Link to='/admin/category/add'><Button  className="button-add margin" type='button'>Add Category</Button></Link>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th style= {{width:'60px'}}>Id</th>
                    <th>Title</th>
                    <th style= {{width:'120px'}}>Posts</th>
                    <th style= {{width:'120px'}}>Edit</th>
                    <th style= {{width:'120px'}}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                    <tr>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>{category.posts.length}</td>
                        <td>
                            <Button href={'/admin/category/'+category.id+'/edit'} value={category} className="btn btn-warning">Edit</Button>
                        </td>
                        <td>
                        <Button onClick={this.handleDelete} value={category.id} className="btn btn-danger">Delete</Button>
                        </td>
                    </tr>
                    ))}     
                </tbody>
                </Table>
            </div>
         );
    }
}
 
export default AllCategory;