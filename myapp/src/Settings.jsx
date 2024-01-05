import React, { useState, useEffect } from 'react';
import './Settings.css';
import axios from 'axios';
import logo from './images/logo.png'
import zeeshan_profile from './images/zeeshan.png';

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

    const [contacts, setContacts] = useState([]);

    // Function to fetch contacts from the server
    useEffect(() => {
      fetchContacts();
  }, []);

    const fetchContacts = async () => {
      try {
          const response = await axios.get('http://127.0.0.1:5000/get_all_contacts/Zeeshan');
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
        const response = await axios.post('http://127.0.0.1:5000/add_contact', {
          newContact, // your contact fields
          username: 'Zeeshan', // replace with the actual username
        });
        console.log(response.data);
        fetchContacts(); // update contacts to display in table
        // Reset form or give user feedback
      } catch (error) {
        console.error('Error submitting new contact:', error);
        // Handle error here
      }


      try {
        const url = 'https://5b51-2604-3d09-d7f-330-d4bc-f7e0-810-d403.ngrok-free.app/make_call';
        const to_number = '+18255615201';
        const message = `Hello ${contactName}, this is to inform you that you have been added as a Notifier for Zeeshan Chougle on I-Sole Diabetic Tracking App. Thank you, and have a wonderful day!`;
      
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
        await axios.post('http://127.0.0.1:5000/delete_contact', {
            username: 'Zeeshan',
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
                <li><a href="/homepage">🏠 Homepage</a></li>
                <li><a href="/feedback">💬 Feedback</a></li>
                <li><a href="/analytics">📊 Analytics</a></li>
                <li><a href="/settings" className="active">⚙️ Settings</a></li>
            </ul>
            </nav>

            <div className="sidebar-profile">
            <img src={zeeshan_profile} alt="Dr. Z Chougle" className="sidebar-profile-pic" />
            <div className="sidebar-profile-name">Dr. Z Chougle</div>
            <button className="signout-button">➜</button> {/* This is a placeholder icon */}
            </div>

        </aside>


        <main className="settings">      
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
