import React from 'react';
import { useEffect, useState } from 'react';
import './AnalyticsPage.css'; // Make sure to create a corresponding Analytics.css file
import axios from 'axios';
import logo from './images/logo.png';
import profilePic from './images/zeeshan.png'; // Replace with the logged-in user's profile picture
import { useNavigate } from 'react-router-dom';
import barchart from './images/barchart.png';
import linechart from './images/linechart.png';
import blood from './images/blood.png'
import sweat from './images/sweat.png'
import feet from './images/feet.png'
import piechart from './images/piechart.png'
import ToggleSwitch from './ToggleSwitch';
import glucoseDayChart from './images/day.png';
import glucoseWeekChart from './images/week.png';
import glucoseMonthChart from './images/month.png';
import footImage from './images/foot.png'
import { firestore } from './firebase';
import { doc, collection, onSnapshot } from 'firebase/firestore';

function Analytics() {
  const navigate = useNavigate(); // Hook to access the history instance
  const [currUsername, setCurrUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Day');
  const [predictionState, setPredictionState] = useState('');
  const [predictionTime, setPredictionTime] = useState('');
  const [predictionImage, setPredictionImage] = useState('');
  // State to control if the prediction image should be shown
  const [showGlucosePrediction, setshowGlucosePrediction] = useState(false);
  const [showPressurePrediction, setshowPressurePrediction] = useState(false);
  const [basalValue, setBasalValue] = useState('-');
  const [bolusDose, setBolusDose] = useState('-');
  const [basisGsrValue, setBasisGsrValue] = useState('-');
  const [basisSkinTemperatureValue, setBasisSkinTemperatureValue] = useState('-');
  const [fingerStickValue, setFingerStickValue] = useState('-');
  const [sweatGlucose, setSweatGlucose] = useState(null);
  const [bloodGlucose, setBloodGlucose] = useState(null);
  const [footRegion, setFootRegion] = useState('p1');
  const [pressurePlotImage, setPressurePlotImage] = useState('');

  // Add state for controlling overlay visibility
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  // State for the current plot to display
  const [currentPlot, setCurrentPlot] = useState('');


  // Add useEffect to retrieve currUsername from local storage
  useEffect(() => {
    // Retrieve the current username from local storage
    const storedUsername = localStorage.getItem('curr_username');
    const storedUserRole = localStorage.getItem('userRole');

    if (storedUsername) {
      setCurrUsername(storedUsername);
    } else {
      // Handle the case where the username is not found in local storage
      console.error("Username not found in local storage");
    }

    if (storedUserRole) {
      setUserRole(storedUserRole);
    } else {
      console.error("User Role not found in local storage");
    }
  }, []);

  useEffect(() => {

    const username='Lubaba';
    const docRef = doc(firestore, 'users', username);

    console.log("User inside listner: ", username)

    // Create a reference to the 'pressureData' subcollection
    const pressureDataCollectionRef = collection(docRef, 'pressureData');

    // Set up a listener for changes in the 'pressureData' subcollection
    const unsubscribe = onSnapshot(pressureDataCollectionRef, (querySnapshot) => {
      // Handle changes in the pressure data
      console.log("Pressure data updated:", querySnapshot.docs);
      fetchPressurePlotImage(footRegion); // Call fetchPressurePlotImage when pressure data is updated
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [footRegion]); // This useEffect runs when username changes


  const makePrediction = async () => {
    try {

      console.log("We reached make Pred");

      await getLatestGlucose(); // Wait for getLatestGlucose to complete before proceeding

      console.log("After await latest glucose value: ", sweatGlucose);

      await fetchPersonalMetrics();
  
      const data = {
        "input_data": {
          "glucose_level_value": sweatGlucose, 
          "finger_stick_value": fingerStickValue, 
          "basal_value": basalValue, 
          "basis_gsr_value": basisGsrValue, 
          "basis_skin_temperature_value": basisSkinTemperatureValue, 
          "bolus_dose": bolusDose
        }, 
        "hyperglycemia_threshold": 180, 
        "hypoglycemia_threshold": 100
      };
  
      // Note: responseType is not needed here since the default is JSON
      const response = await axios.post('http://127.0.0.1:5000/plot-prediction', data);
      
      // Extract the data from the response
      const { image, prediction_state, prediction_time } = response.data;
  
      // Log the prediction state and time
      console.log("Prediction State:", prediction_state);
      console.log("Prediction Time:", prediction_time);
  
      // Update state with the prediction state and time
      setPredictionState(prediction_state);
      setPredictionTime(prediction_time);
  
      if (prediction_state === 'hyperglycemia' || prediction_state === 'hypoglycemia') {
        makeCall();
      }
  
      // Convert base64 string to a URL for the image and update state
      const imageUrl = `data:image/png;base64,${image}`;
      setPredictionImage(imageUrl);
      setshowGlucosePrediction(true); // Indicate that the prediction image should now be displayed
  
    } catch (error) {
      // Log any error that occurs during the Axios request
      console.error('Error making the prediction:', error);
      if (error.response) {
        // Log the response error for debugging
        console.error("Error Response:", error.response);
      }
    }
  };

  const getLatestGlucose = async () => {
    try {
      const username = 'Lubaba';
      const response = await axios.get(`https://i-sole-backend.com/get_latest_glucose_value_new/Lubaba`);
      if (response.data.success) {
        const { sweat_glucose, blood_glucose } = response.data;
        setSweatGlucose(sweat_glucose);
        setBloodGlucose(blood_glucose);
        console.log("sweat glucose: ", sweat_glucose);
      } else {
        console.error('Failed to fetch latest glucose data:', response.data.message);
        // Handle the case where fetching the data was unsuccessful
      }
    } catch (error) {
      console.error('Error fetching latest glucose data:', error);
      // Handle any errors that occur during the request
    }
  };
  
  const resetPrediction = () => {
    // Reset to show the default day chart and hide the prediction image
    setshowGlucosePrediction(false);
    setPredictionImage(glucoseDayChart); // Revert to the default day chart image
    setBasalValue('-');
    setBolusDose('-');
    setBasisGsrValue('-');
    setBasisSkinTemperatureValue('-');
    setFingerStickValue('-');
  };

  const fetchPersonalMetrics = async () => {
    const username = 'Lubaba'; // Define the username
    const endpoint = `https://i-sole-backend.com/get_personal_metrics/${username}`;

    try {
      const response = await axios.post(endpoint);
      console.log(response.data)
      
      // Extract and store only the values of the specified fields
      const {
        basal_value,
        bolus_dose,
        basis_gsr_value,
        basis_skin_temperature_value,
        finger_stick_value
      } = response.data.data;

      // Update state variables with the extracted values
      setBasalValue(basal_value);
      setBolusDose(bolus_dose);
      setBasisGsrValue(basis_gsr_value);
      setBasisSkinTemperatureValue(basis_skin_temperature_value);
      setFingerStickValue(finger_stick_value);
    } catch (error) {
      console.error('Error fetching personal metrics:', error);
    }
  };
  
  const makeCall = async () => {
    const data = {
      to: '+18255615201', // Replace with the recipient phone number
      message: `This is an alert from the I-sole diabetic app, there is a high risk of ${predictionState} for Lubaba within the next hour` // Replace with your message
    };

    try {
      const response = await axios.post('https://i-sole-backend.com/make_call', data);
      console.log('Call initiated. SID:', response.data);
    } catch (error) {
      console.error('Error making the call:', error);
    }
  };

  const closeModal = () => {
    setIsOverlayVisible(false);
    setFootRegion(''); // Reset the foot region to indicate no selection
  };

  // Function to handle region button clicks
  const handleRegionButtonClick = (region) => {
    setFootRegion(region);
    fetchPressurePlotImage(region); // This will handle setting the current plot and showing overlay once fetch completes
    setIsOverlayVisible(true); // Show overlay here to ensure it happens after image is ready
  };

  const fetchPressurePlotImage = (region) => {

    const username = 'Lubaba';
    console.log('footRegion: ', region)

    console.log('fetchPressurePlotImage called')

    const startTimestampEdmonton = '2024-04-02T04:30:21'
    const endTimestampEdmonton = '2024-04-15T12:30:21'

    const url = `http://127.0.0.1:5000/plot_pressure?username=${username}&start_timestamp=${startTimestampEdmonton}&end_timestamp=${endTimestampEdmonton}&region=${region}`;

    console.log('start time: ', startTimestampEdmonton)
    console.log('end time: ', endTimestampEdmonton)

    // Make the GET request with the constructed URL
    axios.get(url, {
      responseType: 'blob' // Indicates that the response data should be treated as a Blob
    })
    .then(response => {
      // Create a local URL for the blob object
      const imageUrl = URL.createObjectURL(response.data);
      setPressurePlotImage(imageUrl); // Use this URL for displaying the image
      setCurrentPlot(imageUrl); // Now update currentPlot with the new imageUrl
    })
    .catch(error => {
      console.error('There was an error fetching the plot image:', error);
    });
  };


  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="I-Sole Diabetic Tracking" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            
            <li><a href="#/feedback">💬 Feedback</a></li>
            <li><a href="#/analytics" className="active">📊 Analytics</a></li>
            <li><a href="#/settings">🔔 Notifications</a></li>
          </ul>
        </nav>
        <div className="sidebar-profile">
          <img src="data:image/png;base64,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" alt="currUsername" className="sidebar-profile-pic" />
          <div className="sidebar-profile-name">
              {userRole === 'Doctor' ? `Dr. ${currUsername}` : currUsername}
          </div>
          <button className="signout-button" onClick={() => navigate('/login')}>
            ➜
          </button>
        </div>
      </aside>


  <main className="analytics-content">
        <div className="top-row">
            <div className="card blood-glucose">
              <div className="card-header">
                <img src={blood} alt="Blood Glucose Icon" className="icon" />
                <p>Blood Glucose Level</p>
              </div>
              <h1>95 mg/dL</h1>
              <span className="positive">+10%</span>
            </div>
            <div className="card retina-pressure">
              <div className="card-header">
                <img src={feet}  alt="Retina Pressure Icon" className="icon" />
                <p>Plantar Pressure Level</p>
              </div>
              <h1>81 kPa</h1>
              <span className="negative">-15%</span>
            </div>
            <div className="card blood-glucose">
              <div className="card-header">
                <img src={sweat}  alt="Sweat Glucose Icon" className="icon" />
                <p>Sweat Glucose Level</p>
              </div>
              <h1>45 mg/dL</h1>
              <span className="positive">+10%</span>
            </div>
      </div>


          <div className="main-content">
              
          <div className="charts-column">

            <div className="chart pressure-sensor-analytics">
              <div className="chart-header">
                <h1>Pressure Sensor Analytics</h1>
                {/* <ToggleSwitch /> Include the toggle switch */}
              </div>


              {/* <img src={glucoseWeekChart} alt="Pressure Sensor Analytics Chart" /> */}
              <div className="footBox">
                {/* <p className="cardTitleText">Select Region to View Data</p> */}
                <div className="footContainer">
                  <img src={footImage} alt="Foot" className="footIcon" /> {/* Use the image here */}
                  <div className="regionContainer">
                    {/* Buttons for selecting foot regions */}
                    <button
                      className={`regionButton regionButton1 ${footRegion === 'p1' ? 'selectedToggle' : ''}`}
                      onClick={() => handleRegionButtonClick('p1')}>
                      P1
                    </button>
                    <button
                      className={`regionButton regionButton2 ${footRegion === 'p5' ? 'selectedToggle' : ''}`}
                      onClick={() => handleRegionButtonClick('p5')}>
                      P5
                    </button>
                    <button
                      className={`regionButton regionButton3 ${footRegion === 'p6' ? 'selectedToggle' : ''}`}
                      onClick={() => handleRegionButtonClick('p6')}>
                      P6
                    </button>
                    <button
                      className={`regionButton regionButton4 ${footRegion === 'p3' ? 'selectedToggle' : ''}`}
                      onClick={() => handleRegionButtonClick('p3')}>
                      P3
                    </button>
                    <button
                      className={`regionButton regionButton5 ${footRegion === 'p2' ? 'selectedToggle' : ''}`}
                      onClick={() => handleRegionButtonClick('p2')}>
                      P2
                    </button>
                    <button
                      className={`regionButton regionButton6 ${footRegion === 'p4' ? 'selectedToggle' : ''}`}
                      onClick={() => handleRegionButtonClick('p4')}>
                      P4
                    </button>

                  </div>
                </div>
              </div>

              <button className="reset-button" onClick={resetPrediction}>Reset</button> 


            </div>

            <div className="chart glucose-sensor-analytics">
              <div className="chart-header">
                <h1>Glucose Sensor Analytics</h1>
                <ToggleSwitch onToggle={setSelectedTimeframe} />
              </div>
              {selectedTimeframe === 'Day' && (
                <img src={showGlucosePrediction ? predictionImage : glucoseDayChart} alt="Glucose Sensor Analytics Chart - Day" />
              )}
              {selectedTimeframe === 'Week' && (
                <img src={glucoseWeekChart} alt="Glucose Sensor Analytics Chart - Week" />
              )}
              {selectedTimeframe === 'Month' && (
                <img src={glucoseMonthChart} alt="Glucose Sensor Analytics Chart - Month" />
              )}
              <div className="buttons-container">
                <button className="reset-button" onClick={resetPrediction}>Reset</button> 
                <button className="make-prediction-button" onClick={makePrediction}>Make Prediction</button>
              </div>
            </div>


          </div>
            
              <div className="side-column">

              <div className="card predictions">
                <h1>Predictions</h1>
                <ul className="predictions-list">
                  <li>Hypoglycemia <strong className={
                    showGlucosePrediction && predictionState === 'hypoglycemia' ? 
                    "high-risk" : 
                    (showGlucosePrediction ? 'low-risk' : '')
                  }>
                  {
                    showGlucosePrediction && predictionState === 'hypoglycemia' ? 
                    `High Risk - ${predictionTime}` : 
                    (showGlucosePrediction ? 'Low Risk' : '-')
                  }
                  </strong></li>
                  <li>Hyperglycemia <strong className={
                    showGlucosePrediction && predictionState === 'hyperglycemia' ? 
                    "high-risk" : 
                    (showGlucosePrediction ? 'low-risk' : '')
                  }>
                  {
                    showGlucosePrediction && predictionState === 'hyperglycemia' ? 
                    `High Risk - ${predictionTime}` : 
                    (showGlucosePrediction ? 'Low Risk' : '-')
                  }
                  </strong></li>
                  <li>Diabetic Ulceration<strong className={
                      showPressurePrediction ? 'low-risk' : ''
                    }>{
                      showPressurePrediction ? 'Low Risk' : '-'
                    }</strong></li>
                </ul>
              </div>




                  
              <div className="card predictions">
                <h1>Personal Metrics</h1>
                <ul className="predictions-list">
                  <li>Basal Dosage <strong className={basalValue !== '-' ? "low-risk" : "golden"}>{basalValue !== '-' ? `${basalValue} units` : basalValue}</strong></li>
                  <li>Bolus Dosage <strong className={bolusDose !== '-' ? "low-risk" : "golden"}>{bolusDose !== '-' ? `${bolusDose} units` : bolusDose}</strong></li>
                  <li>Basis GSR <strong className={basisGsrValue !== '-' ? "low-risk" : "golden"}>{basisGsrValue !== '-' ? `${basisGsrValue} mg/dL` : basisGsrValue}</strong></li>
                  <li>Basis Skin Temperature <strong className={basisSkinTemperatureValue !== '-' ? "low-risk" : "golden"}>{basisSkinTemperatureValue !== '-' ? `${basisSkinTemperatureValue} °F` : basisSkinTemperatureValue}</strong></li>
                  <li>Finger Stick Value <strong className={fingerStickValue !== '-' ? "low-risk" : "golden"}>{fingerStickValue !== '-' ? `${fingerStickValue} units` : fingerStickValue}</strong></li>
                </ul>
              </div>
                            
              </div>


          </div>
  </main>


  {isOverlayVisible && (
      <div className="overlay" onClick={closeModal}>
        <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
          <img src={currentPlot} alt="Plot" />
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    )}


    </div>
  );
}

export default Analytics;
