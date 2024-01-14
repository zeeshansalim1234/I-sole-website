import React, { useState, useEffect } from 'react';
import './Settings.css';
import axios from 'axios';
import logo from './images/logo.png'
import zeeshan_profile from './images/zeeshan.png';
import { useNavigate  } from 'react-router-dom';

function Settings() {
    const [activity, setActivity] = useState(false);
    const [meals, setMeals] = useState(false);
    const [feedback, setFeedback] = useState(false);
    const [contactName, setContactName] = useState('');
    const [relationship, setRelationship] = useState('family');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [glucoseAlert, setGlucoseAlert] = useState(false);
    const [medicationReminder, setMedicationReminder] = useState(false);
    const [currUsername, setCurrUsername] = useState('');
    const [patientUsername, setpatientUsername] = useState('');
    const [userRole, setUserRole] = useState('');
    const [patientID, setPatientID] = useState(''); // Add patientID state
    const navigate = useNavigate();  // Hook to access the history instance

    useEffect(() => {

      const storedUsername = localStorage.getItem('curr_username');
      const patientUsername = localStorage.getItem('patientUsername');
      const storedUserRole = localStorage.getItem('userRole');
      const storedPatientID = localStorage.getItem('patientID'); // Get patientID from storage

      if (storedUsername) {
        setCurrUsername(storedUsername);
      } else {
        console.error("Username not found in local storage");
      }

      if (patientUsername) {
        setpatientUsername(patientUsername);
      } else {
        console.error("Username not found in local storage");
      }

      if (storedUserRole) {
        setUserRole(storedUserRole);
      } else {
        console.error("User Role not found in local storage");
      }

      if (storedPatientID) {
        setPatientID(storedPatientID); // Set patientID state
      } else {
        console.error("Patient ID not found in local storage");
      }

      fetchContacts();

    }, [currUsername, patientUsername, userRole]);

    const [contacts, setContacts] = useState([]);

    const fetchContacts = async () => {
      try {
          const response = await axios.get(`http://35.182.46.235/get_all_contacts/${patientUsername}`);
          setContacts(response.data.contacts);
      } catch (error) {
          console.error('Error fetching contacts:', error);
      }
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      const newContact = {
        contactName,
        relationship,
        phoneNumber,
        email,
        glucoseAlert,
        medicationReminder,
      };

      try {
        const response = await axios.post('http://35.182.46.235/add_contact', {
          newContact, // your contact fields
          username: patientUsername, // replace with the actual username
        });
        console.log(response.data);
        fetchContacts(); // update contacts to display in table
        // Reset form or give user feedback
      } catch (error) {
        console.error('Error submitting new contact:', error);
        // Handle error here
      }


      try {
        const url = 'http://35.182.46.235/make_call';
        const to_number = phoneNumber;
        const message = `Hello ${contactName}, 
          We are pleased to inform you that you have been added as a ${relationship} notifier for ${patientUsername} in the I-Sole Diabetic Tracking App. Your role is crucial in supporting and monitoring their health journey.
          Thank you for being part of our community. We wish you a wonderful day!`;

      
        // URL encoding is not typically necessary for POST request body
        // Prepare the data to be sent in the POST request
        const data = {
          to: to_number,
          message: message // Directly sending the message without URL encoding
        };
      
        // Make the POST request
        axios.post(url, data)
          .then(response => {
            console.log('Response from server:', response.data);
          })
          .catch(error => {
            console.error('Error during the call:', error);
          });
      } catch (error) {
        console.error('Error setting up the call:', error);
      }
      
  }
      

    // Function to remove a contact both from state and database
    const removeContact = async (contactNameToRemove) => {
      try {
        // Make a POST request to delete the contact
        await axios.post('http://35.182.46.235/delete_contact', {
            username: patientUsername,
            contactName: contactNameToRemove,
        });
    
        // Use a functional update to ensure we have the latest state
        setContacts(currentContacts =>
          currentContacts.filter(contact => contact.name !== contactNameToRemove)
        );
      } catch (error) {
        console.error('Error removing contact:', error);
      }
    };

    return (
      <div className="app">

        <aside className="sidebar">

            <div className="sidebar-logo">
            <img src={logo} alt="I-Sole Diabetic Tracking" />
            </div>

            <nav className="sidebar-nav">
            <ul>
                <li><a href="#/homepage">🏠 Homepage</a></li>
                <li><a href="#/feedback">💬 Feedback</a></li>
                <li><a href="#/analytics">📊 Analytics</a></li>
                <li><a href="#/settings" className="active">🔔 Notifications</a></li>
            </ul>
            </nav>

            <div className="sidebar-profile">
            <img src="data:image/png;base64,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" alt="currUsername" className="sidebar-profile-pic" />
            <div className="sidebar-profile-name">
              {userRole === 'Doctor' ? `Dr. ${currUsername}` : currUsername}
            </div>
            <button
              className="signout-button"
              onClick={() => navigate('/login')}
            >
              ➜
            </button>
          </div>

        </aside>


        <main className="settings">    

        <div className="patient-id">
          <h1>Patient ID</h1> {/* "Patient ID" without patientID */}
          <div className="patient-id-container">
            <h1>{patientID}</h1> {/* Display patientID in a new div */}
          </div>
        </div>


              <div className="update-notifications">
                <h1>Notifications Settings</h1>
                <div className="toggle">
                  <label>
                    Allow Family Members to see Activity
                    <input
                      type="checkbox"
                      checked={activity}
                      onChange={() => setActivity(!activity)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle">
                  <label>
                    Allow Family Members to see Meals
                    <input
                      type="checkbox"
                      checked={meals}
                      onChange={() => setMeals(!meals)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle">
                  <label>
                    Allow Family Members to see Doctor's Feedback
                    <input
                      type="checkbox"
                      checked={feedback}
                      onChange={() => setFeedback(!feedback)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
            </div>
           



      <div className="contacts-section">
        {/* Contact list */}


        <div className="contact-list">
            <h1>Your Contact</h1>
            <br />
            <div className="contact-list-scrollable">
              {contacts.map((contact, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-info">
                    <div className="contact-name">{contact.name}</div>
                    <div className="contact-relationship">{contact.relationship}</div>
                    {/* You can display other contact details here as well */}
                  </div>
                  <div className="contact-item-buttons">
                    <button className="edit-contact-btn">Edit</button>
                    <button 
                      className="remove-contact-btn"
                      onClick={() => removeContact(contact.name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <form className="new-contact-form" onSubmit={handleSubmit}>
              <h1>Add New Contact</h1>
                  <br></br>
              <div className="field">
                <label htmlFor="contactName">Contact Name</label>
                <input
                  type="text"
                  id="contactName"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="relationship">Relationship</label>
                <select
                  id="relationship"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                >
                  <option value="family">Family</option>
                  <option value="doctor">Doctor</option>
                  <option value="caregiver">Caregiver</option>
                  {/* More options as needed */}
                </select>
              </div>
              <div className="field">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email (optional)</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <div className="checkbox-group">
                  <div className="checkbox-custom">
                    <input
                      type="checkbox"
                      id="glucoseAlert"
                      className="checkbox-input"
                      checked={glucoseAlert}
                      onChange={(e) => setGlucoseAlert(e.target.checked)}
                    />
                    <label htmlFor="glucoseAlert" className="checkbox-label">Glucose Level Alert</label>
                  </div>
                  <div className="checkbox-custom">
                    <input
                      type="checkbox"
                      id="medicationReminder"
                      className="checkbox-input"
                      checked={medicationReminder}
                      onChange={(e) => setMedicationReminder(e.target.checked)}
                    />
                    <label htmlFor="medicationReminder" className="checkbox-label">Medication Reminder</label>
                  </div>
                </div>
              </div>
              <button type="submit" className="save-contact-btn">Save Contact</button>
            </form>

    
        </div>

        </main>
      </div>
    );
  }
  
  export default Settings;
