import React from 'react';
import './AnalyticsPage.css'; // Make sure to create a corresponding Analytics.css file
import axios from 'axios';
import logo from './images/logo.png';
import profilePic from './images/zeeshan.png'; // Replace with the logged-in user's profile picture
import { useNavigate } from 'react-router-dom';
import barchart from './images/barchart.png';
import ToggleSwitch from './ToggleSwitch';

function Analytics() {
  const navigate = useNavigate(); // Hook to access the history instance

  // Add state and useEffect logic here for fetching analytics data

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="I-Sole Diabetic Tracking" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><a href="/homepage">🏠 Homepage</a></li>
            <li><a href="/feedback">💬 Feedback</a></li>
            <li><a href="/analytics" className="active">📊 Analytics</a></li>
            <li><a href="/settings">⚙️ Settings</a></li>
          </ul>
        </nav>
        <div className="sidebar-profile">
          <img src={profilePic} alt="currUsername" className="sidebar-profile-pic" />
          <div className="sidebar-profile-name">Zeeshan</div>
          <button className="signout-button" onClick={() => navigate('/login')}>
            ➜
          </button>
        </div>
      </aside>


  <main className="analytics-content">
          <div className="top-row">
            <div className="card blood-glucose">
              <h2>Blood Glucose Level</h2>
              <p>95 mg/dL</p>
              <span>+10</span>
            </div>
            <div className="card retina-pressure">
              <h2>Retina Pressure</h2>
              <p>81 kPa</p>
              <span>+10</span>
            </div>
            <div className="card blood-glucose">
              <h2>Blood Glucose Level</h2>
              <p>95 mg/dL</p>
              <span>+10</span>
            </div>
          </div>

          <div className="main-content">
              
          <div className="charts-column">
            <div className="chart pressure-sensor-analytics">
              <div className="chart-header">
                <h1>Pressure Sensor Analytics</h1>
                <ToggleSwitch /> {/* Include the toggle switch */}
              </div>
              <img src={barchart} alt="Pressure Sensor Analytics Chart" />
            </div>
            <div className="chart glucose-sensor-analytics">
              <div className="chart-header">
                <h1>Glucose Sensor Analytics</h1>
                <ToggleSwitch /> {/* Include the toggle switch */}
              </div>
              <img src={barchart} alt="Glucose Sensor Analytics Chart" />
            </div>
          </div>



            
              <div className="side-column">

                <div className="card predictions">
                    <h2>Predictions</h2>
                    <ul className="predictions-list">
                      <li>Next Hypoglycemia: <strong>9:00 PM, May 12</strong></li>
                      <li>Next Hyperglycemia: <strong>1:00 PM, May 13</strong></li>
                      <li>Diabetic Ulceration Risk: <strong>Low</strong></li>
                    </ul>
                  </div>

                  <div className="card current-glucose-level">
                    <h2>Current Glucose Level</h2>
                    <div className="donut-chart-dummy">
                      <p>95 mg/dL</p> {/* Dummy donut chart data */}
                    </div>
                  </div>
                  
              </div>


          </div>
  </main>




    </div>
  );
}

export default Analytics;
