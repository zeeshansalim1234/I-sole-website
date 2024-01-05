import React, { useState } from 'react';
import axios from 'axios';
import './SignupPage.css'; // Make sure this is the correct path to your CSS file
import logoImage from './images/logo.png'; // Update with the correct path to your logo image
import google from './images/google.png'; // Update with the correct path to your logo image
import outlook from './images/outlook.png'; // Update with the correct path to your logo image
import { useNavigate  } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Patient'); // Initialize role state
  const [patientID, setPatientID] = useState(''); // Initialize patientNumber state
  const [username, setUsername] = useState(''); // State for username
  const navigate = useNavigate();  // Hook to access the history instance

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
        const signupResponse = await axios.post('http://localhost:5000/signup', {
            username: username,
            email: email,
            password: password,
            fullName: fullName,
            role: role,
            patientID: role === 'Patient' ? '' : patientID,
        });

        if (signupResponse.data.success) {
            console.log("Account created successfully");

            const { patientID, role } = signupResponse.data.user_data;

            // Store the username in local storage
            localStorage.setItem('curr_username', username);
            localStorage.setItem('patientID', patientID);
            localStorage.setItem('userRole', role);

            // Call the initialize_counter endpoint only if role is 'Patient'
            if (role === 'Patient') {
              const counterResponse = await axios.post('http://localhost:5000/initialize_counter', {
                username: username,
              });

              if (counterResponse.data.success) {
                console.log("Counter initialized successfully");
              } else {
                console.log("Failed to initialize counter");
              }
            }

            navigate('/feedback');  // Redirect to '/feedback' route
        } else {
            console.log("Failed to create account");
        }
      } catch (error) {
          console.error('Error during sign up:', error);
      }
  };


  // Function to render the patient number input when role is Doctor or Family
  const renderPatientNumberInput = () => {
    if (role === 'Doctor' || role === 'Family') {
      return (
        <input
          type="text"
          placeholder="Patient ID"
          value={patientID}
          onChange={(e) => setPatientID(e.target.value)}
        />
      );
    }
    return null;
  };

  return (
    <div className="signup-page-container">
      <div className="signup-image-section">
        {/* This will be the left side with your image or design */}
        <img src={logoImage} alt="I-Sole Diabetic Tracking" />
      </div>
      <div className="signup-form-container">
        <div className="signup-form">
          <h1>Create Account</h1>

          <div className="social-signup">

            <button className="google-signup">
              <img src={google} alt="Google logo" /> {/* Replace with your image path */}
              Sign up with Google
            </button>

            <button className="outlook-signup">
              <img src={outlook} alt="Outlook logo" /> {/* Replace with your image path */}
              Sign up with Outlook
            </button>

          </div>

          <div className="divider">
            <span>OR</span>
          </div>
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username" // New input field for username
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <div className="dropdown-container">
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Patient">Patient</option>
                <option value="Family">Family</option>
                <option value="Doctor">Doctor</option>
              </select> 
              <span className="dropdown-arrow">&#9660;</span>
            </div>

            {/* Render the patient number input based on the selected role */}
           {renderPatientNumberInput()}

            <button type="submit" className="create-account-button">Create Account</button>
          </form>
          <div className="signup-footer">
            <p>
              <a href="http://localhost:3000/login">Already have an account?</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignupPage;
