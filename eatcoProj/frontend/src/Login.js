import React, { useState } from 'react';
import logo from './logo.svg'
import './login.css';

function Login(props) {

    const {loggedIn, setLoggedIn} = props;
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const updateEmail = e => {
        setEmail(e.target.value);
    }

    const updatePw = e => {
        setPw(e.target.value);
    }

    const authenticate = e => {
        console.debug(email, pw);
        const authenticated = true; // authenticate here
        if (authenticated) {
            setLoggedIn(true);
            localStorage.setItem("loggedIn", true);
        } else {
            e.preventDefault();
        }
        
    }
    return (
    <div className="Login">
      <div className="container containerPage">
        <div className="container containerIcon">
            <img src={logo} />
        </div>
        <div className="container containerText">
            <h2>Log In</h2>
            <p>or <a href="/register">register</a> with us</p>           
        </div>

        <form onSubmit={authenticate} action="/">
            <div className="containerFormInput">
                <div className="container containerText">
                    <label>email</label>
                    <input type="text" placeholder="Enter Email" name="email" id="email" required value={email} onChange={updateEmail} />
                </div>
                <div className="container containerText">
                    <label>password</label>
                    <input type="password" placeholder="Enter Password" name="psw" id="psw" required value={pw} onChange={updatePw} />
                </div>
            </div>
            <div className="container containerSubmit">
                <button type="submit" className="registerbtn">Submit</button>
            </div>
        </form>
    </div>
    </div>
  );
}
  
export default Login;
  