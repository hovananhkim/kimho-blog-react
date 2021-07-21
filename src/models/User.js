class User{
    constructor(){}
    user = {
        'id': 0,
        'email':'asda',
        'firstname': '',
        'lastname': '',
        'password': '',
        'posts': [],
        'roles': []
    }
    getUser() {
        let user = {};
        console.log("vo");
        const base64Url = localStorage.token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        let userFromToken =  JSON.parse(window.atob(base64));
        fetch("http://localhost:8080/api/users/find?email=" + userFromToken.sub,
            {headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }})
        .then(res => res.json())
        .then(data => {
            this.user({
                'id': data.id,
                'email':data.email,
                'firstname': data.firstname,
                'lastname': data.lastname,
                'password': data.password,
                'posts': data.posts,
                'roles': data.roles
            })
        })
        return this.user
    }
}

export default  User;