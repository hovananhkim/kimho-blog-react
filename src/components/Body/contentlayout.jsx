import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../Auth/login.jsx';
import Logout from '../Auth/logout.jsx';
import Register from '../Auth/register.jsx';
import AllCategory from '../Categories/allcatogory.jsx';
import AllUser from '../User/alluser.jsx';
import AllPost from '../Post/allpost.jsx';
import PostForm from '../Post/postform.jsx';
import PostOfCategory from '../Post/postofcategory.jsx';
import Posts from '../Post/posts';
import UserDetail from '../User/userdetail.jsx';
import UserManager from '../User/usermanager.jsx';
import CategoryForm from '../Categories/formcategory.jsx';
class ContentLayout extends Component {
    render() { 
        return ( 
            <BrowserRouter>
                <Container>
                    <Route path="/" exact component={Posts}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/category/:id" component={PostOfCategory}/>
                    <Route path="/userdetail/:id" component={UserDetail}/>
                    <Route path="/user" component={UserManager}/>
                    <Route path="/addpost" component={PostForm}/>
                    <Route path="/addcategory" component={CategoryForm}/>
                    <Route path="/post/:id" component={PostForm}/>
                    <Route path="/posts" component={AllPost}/>
                    <Route path="/users" component={AllUser}/>
                    <Route path="/categories" component={AllCategory}/>
                </Container>            
            </BrowserRouter>
         );
    }
}
 
export default ContentLayout;