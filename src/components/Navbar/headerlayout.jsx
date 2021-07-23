import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './navbar.css';
import {  Nav, Container} from 'react-bootstrap';
import logo from './openwtlogo.png';
class HeaderLayout extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoader: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/categories")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            })
    }
    
    render() { 
        var {items} = this.state;
        return (  
            <Container>
                <Nav className="navbar navbar-expand-sm navbar-light">
                    <a className="navbar-brand" href='/'>
                        <img src={logo} alt="OpenWT" className="image"/>
                    </a>
                    <div class="collapse navbar-collapse" id="navbarNav"></div>
                    {!localStorage.token && <Nav.Link href="/login">Login</Nav.Link>}
                    {!localStorage.token && <Nav.Link href="/register">Register</Nav.Link>}
                    {localStorage.token && <Nav.Link href="/logout">Logout</Nav.Link>}
                </Nav>
                <div class="card card-category" >
                    <nav class="navbar navbar-expand-sm " >
                    <div class="collapse navbar-collapse" id="navbarnar">
                    <ul class="navbar-nav text-category" >
                        <li class="nav-item active" >
                        <a class="nav-link text-color" href="/">HOME</a>
                        </li>
                        {items.map(item => (
                            <li class="nav-item active" >
                                <a class="nav-link  text-color" href={"/category/"+item.id}>{item.name.toUpperCase()}</a>
                            </li>
                        ))}
                        {localStorage.token && 
                        <li class="nav-item active" >
                                <a class="nav-link  text-color" href={"/user"}>USER MANAGER</a>
                        </li>}
                    </ul>
                    </div>
                    </nav>
                </div>
            </Container>
            
        );
    }
}
 
export default HeaderLayout;