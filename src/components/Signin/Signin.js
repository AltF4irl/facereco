import React from "react";
import "./Signin.css";

class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signinEmail: '',
            singinPassword: '',
            signinValid: true
        }
    }

    onEmailChange = (event) => {
        this.setState({signinEmail: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({singinPassword: event.target.value});
    }
    onSubmitSignin = () => {
        fetch("https://murmuring-reaches-30024.herokuapp.com/signin", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signinEmail,
                password: this.state.singinPassword
            })
        })
        .then(res => res.json())
        .then(user => {
            if (user.id) {
                this.setState({signinValid: true});
                this.props.updateUser(user);
                this.props.onRouteChange('home');
            } else {
                this.setState({signinValid: false});
                document.querySelector('.email').value = '';
                document.querySelector('.password').value = '';
            }
        })
        
    }

    render() {
        const {onRouteChange, updateUser} = this.props;
        return (
            <div className="ff">
                <div className="signinform">
                {!this.state.signinValid ? <p>Invalid Email / Password combination</p>: <p></p>}
                    <div className="form-group">
                        <input onChange={this.onEmailChange} className="form-control email" type="email" placeholder="Email" required />
                        <label className="form-label">Email</label>
                    </div>
                    <div className="form-group">
                        <input onChange={this.onPasswordChange} className="form-control password" type="password" placeholder="Password" required />
                        <label className="form-label">Password</label>
                    </div>
                    <input onClick={this.onSubmitSignin} className="sub" type="submit" value="Sign In"/>
                    <p onClick={() => onRouteChange('register')}>Register</p>
                </div>
            </div>
        )
    }
}
//asfkjf/
export default Signin;
