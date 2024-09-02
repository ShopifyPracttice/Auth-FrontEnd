// src/components/LoginButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = ({setFacebookData}) => {
    const navigate = useNavigate();
    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };
    const handleFacebookLogin = () => {
        window.FB.getLoginStatus(function(response) {
            if (response.status !== 'connected') {
                window.FB.login(function(response) {
                    if (response.authResponse) {
                        console.log('Welcome! Fetching your information....');
                        window.FB.api('/me?fields=id,name,last_name,email,picture.type(large),friends,photos', function(response) {
                            // console.log('Good to see you, ' + response.name + '.');
                            console.log(response);
                            setFacebookData(response)
                            navigate("/dashboard")
                        });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                });
            } else {
                console.log('User already logged in');
                window.FB.api('/me?fields=id,name,last_name,email,picture.type(large),friends,photos', function(response) {
                    console.log(response);
                    setFacebookData(response)
                    navigate('/dashboard')
                    // console.log('Good to see you, ' + response.name + '.');
                });
            }
        });
    };
    return (
        <>
          <div style={{display:'grid', placeItems: 'center', height: '100vh'}}>
            <div className="form-container">
                <p className="title">Create account</p>
                <p className="sub-title">Let's get started with your 30 days free trial</p>
                <form className="form">
                    <input type="text" className="input" placeholder="Name" />
                    <input type="email" className="input" placeholder="Email" />
                    <input type="password" className="input" placeholder="Password" />
                    <button className="form-btn">Create account</button>
                </form>
                <p className="sign-up-label">
                    Already have an account?
                    <span className="sign-up-link"> Log in</span>
                </p>
                <div className="buttons-container">
                    <div className="apple-login-button" onClick={handleFacebookLogin}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"/>
                        <span>Sign up with Facebook</span>
                    </div>
                    <div className="google-login-button" onClick={handleLogin}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} version="1.1" x="0px" y="0px" className="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                        <span>Sign up with Google</span>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default LoginButton;
