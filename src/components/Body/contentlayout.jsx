import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../Auth/login.jsx';
import Logout from '../Auth/logout.jsx';
import Register from '../Auth/register.jsx';
import AllCategory from '../Categories/categorymanagement.jsx';
import AllUser from '../User/usermanagement.jsx';
import AllPost from '../Post/postmanagement.jsx';
import PostForm from '../Post/postform.jsx';
import PostOfCategory from '../Post/postofcategory.jsx';
import Posts from '../Post/posts';
import UserDetail from '../User/userdetail.jsx';
import CategoryForm from '../Categories/categoryadd.jsx';
import Profile from '../User/profile.jsx';
import PostOfUser from '../Post/postofuser.jsx';
import PostDetail from '../Post/postdetail.jsx';
import CategoryEdit from '../Categories/categoryedit.jsx';
import UserEdit from '../User/useredit.jsx';
import PostEdit from '../Post/postedit.jsx';
import Tag from '../Tag/tag.jsx';
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
                    <Route path="/posts/:id" component={PostDetail}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/admin/post/add" component={PostForm}/>
                    <Route path="/user/post/add" component={PostForm}/>
                    <Route path="/admin/category/add" component={CategoryForm}/>
                    <Route path="/user/posts" component={PostOfUser}/>
                    <Route path="/admin/category/:id/edit" component={CategoryEdit}/>
                    <Route path="/admin/user/:id/edit" component={UserEdit}/>
                    <Route path="/admin/post/:id/edit" component={PostEdit}/>
                    <Route path="/user/post/:id/edit" component={PostEdit}/>
                    <Route path="/admin/posts" component={AllPost}/>
                    <Route path="/admin/users" component={AllUser}/>
                    <Route path="/admin/categories" component={AllCategory}/>
                    <Route path="/tags/:id" component={Tag}/>
                </Container>            
            </BrowserRouter>
         );
    }
}
 
export default ContentLayout;