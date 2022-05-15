import React from 'react';
import logo from './logo.svg'
import './login.css';

function Register() {
    return (
    <div className="Register">
      <div className="containerPage">
        <div className="container containerIcon">
            <img src={logo} />
        </div>
        <div className="container containerText">
            <h2>Log In</h2>
            <p>or <a href="/login">login</a></p>           
        </div>
        
        <div className="containerFormInput">
            <div className="container containerText">
                <label for="email">email</label>
                <input type="text" placeholder="Enter Email" name="email" id="email" required />
            </div>
            <div className="container containerText">
                <label for="psw">password</label>
                <input type="password" placeholder="Enter Password" name="psw" id="psw" required />
            </div>
            <div className="container containerText">
                <label for="con-psw">confirm password</label>
                <input type="password" placeholder="Confirm Password" name="con-psw" id="con-psw" required />
            </div>
        </div>
        <div className="containerSubmit">
            <button type="submit" className="registerbtn">Submit</button>
        </div>
    </div>
    </div>
  );
}
  
export default Register;
  