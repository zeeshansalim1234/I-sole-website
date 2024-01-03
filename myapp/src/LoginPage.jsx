import React, { useState } from 'react';
import './LoginPage.css'; // Make sure this is the correct path to your CSS file
import logoImage from './images/logo.png'; // Update with the correct path to your logo image
import google from './images/google.png'; // Update with the correct path to your logo image
import outlook from './images/outlook.png'; // Update with the correct path to your logo image

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle the sign-up logic here
  };

  return (
    <div className="signup-page-container">
      <div className="signup-form-container">
        <div className="signup-form">
          <h1>Sign In</h1>

          <div className="social-signup">

            <button className="google-signup">
              <img src={google} alt="Google logo" /> {/* Replace with your image path */}
              Sign in with Google
            </button>

            <button className="outlook-signup">
              <img src={outlook} alt="Outlook logo" /> {/* Replace with your image path */}
              Sign in with Outlook
            </button>

          </div>

          <div className="divider">
            <span>OR</span>
          </div>
          <form onSubmit={handleSignUp}>
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
            <button type="submit" className="create-account-button">Sign In</button>
          </form>
          <div className="signup-footer">
            <p>
              <a href="http://localhost:3000/signup">Don't have an account?</a>
            </p>
          </div>

        </div>
      </div>

      <div className="signup-image-section">
        {/* This will be the left side with your image or design */}
        <img src={logoImage} alt="I-Sole Diabetic Tracking" />
      </div>

    </div>
  );
};

export default LoginPage;
