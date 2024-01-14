import React, { useState } from 'react';
import './LoginPage.css'; // Make sure this is the correct path to your CSS file
import logoImage from './images/logo.png'; // Update with the correct path to your logo image
import google from './images/google.png'; // Update with the correct path to your logo image
import outlook from './images/outlook.png'; // Update with the correct path to your logo image
import axios from 'axios'; // Import axios for making API requests
import { useNavigate  } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState(''); // Change to username
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook to access the history instance

  const handleSignIn = async (e) => { // Change the function name to handleSignIn
    e.preventDefault();

    try {
      // Make a POST request to your backend sign-in endpoint
      const response = await axios.post('http://127.0.0.1:5000/signin', {
        username: username, // Use the username state variable
        password: password,
      });

      if (response.data.success) {
        // Authentication successful
        const { username, patientID, role } = response.data.user_data;
      
        // Store curr_username and patientID in local storage
        localStorage.setItem('curr_username', username);
        localStorage.setItem('patientID', patientID);
        localStorage.setItem('userRole', role);
      
        // Log curr_username for debugging
        console.log('curr_username:', username);
      
        // Redirect to your main application page or dashboard
        navigate('/feedback');  // Redirect to '/feedback' route
      } else {
        // Authentication failed, handle the error (e.g., show an error message)
        console.error('Sign-in failed:', response.data.message);
      }
      
    } catch (error) {
      // Handle API request errors
      console.error('Error signing in:', error);
    }
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
          <form onSubmit={handleSignIn}>
            <input
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
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
              <a href="#signup">Don't have an account?</a>
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
