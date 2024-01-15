import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import FeedbackPage from './FeedbackPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import Settings from './Settings';
import AnalyticsPage from './AnalyticsPage';

const App = () => {

  console.log(process.env)

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
