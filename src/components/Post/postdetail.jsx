import React, { Component } from 'react';
import { Card, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class PostDetail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoader: false,
            post: {},
            category: {},
            user: {},
            tags: []
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/api/posts/"+id)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                post: result,
                user: result.user,
                tags: result.tags
              });
            }) 
    }
    render() { 
        const {post, user} = this.state;
        const tags = this.state.tags.slice(0,4);
        return (
            <div>               
                <Card className='post card'>
                <div className='row'> 
                    <div className='card-margin col-sm-7 post'>                  
                    <h2 className='margin-top'>{post.title}</h2>
                    <img className='img-post margin-top' src={post.url}/>
                    <p className='margin-top'>{post.content}</p>
                    <NavLink className='text-color author' href={'/users/'+user.id}>{user.email}</NavLink>
                    <Card.Text className='date1'>{post.createDate}</Card.Text>
                    <div>
                        <b>Tags: </b>
                        {tags.map(tag => (
                            <Link className='link' to={'/tags/'+tag.id}>{tag.name}</Link>
                        ))}
                    </div>
                    </div>    
                    
                </div>
                </Card> 
            </div>
        );
    }
}
 
export default PostDetail;