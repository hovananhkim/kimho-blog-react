import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../Auth/Login.jsx';
import Logout from '../Auth/Logout.jsx';
import Register from '../Auth/Register.jsx';
import PostForm from '../Post/PostForm.jsx';
import PostOfCategory from '../Post/PostOfCategory.jsx';
import Posts from '../Post/Posts';
import UserDetail from '../User/UserDetail.jsx';
import UserManager from '../User/UserManager.jsx';
class ContentLayout extends Component {
    render() { 
        return ( 
            <BrowserRouter>
                <Container>
                    <Route path="/" exact component={Posts}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/categories/:id" component={PostOfCategory}/>
                    <Route path="/users/:id" component={UserDetail}/>
                    <Route path="/user" component={UserManager}/>
                    <Route path="/addpost" component={PostForm}/>
                </Container>            
            </BrowserRouter>
         );
    }
}
 
export default ContentLayout;