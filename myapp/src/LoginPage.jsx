import React, { useState } from 'react';
import './LoginPage.css'; // Make sure to create this CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Handle the sign in logic here, e.g., set cookies, local storage, call an API etc.
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Create Account</h2>
        <div className="social-login">
          <button className="google-login">Sign up with Google</button>
          <button className="facebook-login">Sign up with Facebook</button>
        </div>
        <div className="divider">
          <span>OR</span>
        </div>
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="Full Name"
            // Implement onChange handler
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="create-account-button">Create Account</button>
        </form>
        <div className="login-footer">
          <p>Already have an account?</p>
          {/* Add your link to the sign-in page here */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
