import React, { Component } from 'react';
import { Card, Button} from 'react-bootstrap';
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
        console.log(id);
        this.adminDeleteCategoryFetch(id);  
    }
    adminDeleteCategoryFetch = id => {
        fetch("http://localhost:8080/api/category/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }});
        window.location.reload();
    }
    render() { 
        var categories = this.state.categories;
        return ( 
            <div>
              {categories.map(category => (
                  <Card className='post'>
                  <Card.Body>
                      <div className="row">
                          <div className="col-sm-10">
                              <h6>{category.name}</h6>
                          <div className="font-date"><b>Create at: </b>{category.createDate}</div>
                          </div> 
                          <div className="col-sm-1">
                              <Button href={'/category/edit/'+category.id} value={category} className="btn btn-warning">Edit</Button>
                          </div>
                          <div className="col-sm-1">
                              <Button onClick={this.handleDelete} value={category.id} className="btn btn-danger">Delete</Button>
                          </div>
                              
                      </div>  
                  </Card.Body>    
              </Card>
              ))}
            </div>
         );
    }
}
 
export default AllCategory;