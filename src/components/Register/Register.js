import React from 'react';
import '../Signin/Signin.css';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            isValid: true
        }
    }

    onUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmitRegister = () => {
        fetch("http://localhost:3000/register", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(user => {
            if(user.username) {
                this.setState({isValid: true});
                this.props.updateUser(user);
                this.props.onRouteChange('signin');
            } else {
                this.setState({isValid: false});
                document.querySelector('.username').value = '';
                document.querySelector('.email').value = '';
                document.querySelector('.password').value = '';
            }
        })
        
    }



    render() {
        const {onRouteChange, updateUser} = this.props;
        return(
            <div className="ff">
                <div className="signinform">
                    {!this.state.isValid ? <p>Incorrect form submission, try again.</p> : <p></p>}
                    <div className="form-group">
                        <input onChange={this.onUsernameChange} className="form-control username" type="text" placeholder="Username" required />
                        <label className="form-label">Username</label>
                    </div>
                    <div className="form-group">
                        <input onChange={this.onEmailChange} className="form-control email" type="email" placeholder="Email" required />
                        <label className="form-label">Email</label>
                    </div>
                    <div className="form-group">
                        <input onChange={this.onPasswordChange} className="form-control password" type="password" placeholder="Password" required />
                        <label className="form-label">Password</label>
                    </div>
                    <input onClick={this.onSubmitRegister} className="sub" type="submit" value="Register"/>
                    <p onClick={() => onRouteChange('signin')}>Sign in</p>
                </div>
            </div>
        )
    }
}

export default Register;