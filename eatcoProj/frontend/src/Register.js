import React, { useState } from 'react';
import logo from './logo.svg'
import './login.css';

function Register(props) {

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [cpw, setCpw] = useState('');

    const updateEmail = e => {
        setEmail(e.target.value);
    }

    const updatePw = e => {
        setPw(e.target.value);
    }

    const updateCpw = e => {
        setCpw(e.target.value);
    }

    const authenticate = e => {
        e.preventDefault();
        console.debug(email, pw, cpw);
        if (pw === cpw) {
            // create account
            
        }
    }

    return (
    <div className="Register">
      <div className="container containerPage">
        <div className="container containerIcon">
            <img src={logo} />
        </div>
        <div className="container containerText">
            <h2>Register</h2>
            <p>or <a href="/login">login</a></p>           
        </div>
        
        <form onSubmit={authenticate}>
        <div className="containerFormInput">
            <div className="container containerText">
                <label>email</label>
                <input type="text" placeholder="Enter Email" name="email" id="email" required value={email} onChange={updateEmail} />
            </div>
            <div className="container containerText">
                <label>password</label>
                <input type="password" placeholder="Enter Password" name="psw" id="psw" required value={pw} onChange={updatePw} />
            </div>
            <div className="container containerText">
                <label>confirm password</label>
                <input type="password" placeholder="Confirm Password" name="con-psw" id="con-psw" required value={cpw} onChange={updateCpw} />
            </div>
        </div>
        <div className="containerSubmit">
            <button type="submit" className="registerbtn">Submit</button>
        </div>
        </form>
    </div>
    </div>
  );
}
  
export default Register;
  