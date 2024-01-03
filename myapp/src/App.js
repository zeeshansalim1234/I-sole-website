import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FeedbackPage from './FeedbackPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Updated route for the login page */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Updated route for the login page */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Updated route for the feedback page */}
        <Route path="/feedback" element={<FeedbackPage />} />

        {/* Default route in case no other route matches */}
        <Route path="*" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
