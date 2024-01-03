import React, { useState } from 'react';
import './Settings.css';
import logo from './images/logo.png'
import zeeshan_profile from './images/zeeshan.png';

function Settings() {
    const [activity, setActivity] = useState(false);
    const [meals, setMeals] = useState(false);
    const [feedback, setFeedback] = useState(false);

      // Initial dummy contacts data
    const initialContacts = [
      { name: 'John Doe', relationship: 'Family', phoneNumber: '123-456-7890', email: 'johndoe@example.com' },
      { name: 'Jane Smith', relationship: 'Doctor', phoneNumber: '234-567-8901', email: 'janesmith@example.com' },
      { name: 'Emily Johnson', relationship: 'Caregiver', phoneNumber: '345-678-9012', email: 'emilyj@example.com' },
      { name: 'Michael Brown', relationship: 'Family', phoneNumber: '456-789-0123', email: 'michaelb@example.com' },
      { name: 'Sarah Davis', relationship: 'Family', phoneNumber: '567-890-1234', email: 'sarahd@example.com' }
    ];

    const [contacts, setContacts] = useState(initialContacts); // Use initialContacts as the initial state
  
    // Function to remove a contact by index
    const removeContact = (index) => {
      const newContacts = contacts.filter((_, i) => i !== index);
      setContacts(newContacts);
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
                <li><a href="/feedback" className="active">💬 Feedback</a></li>
                <li><a href="/analytics">📊 Analytics</a></li>
                <li><a href="/settings">⚙️ Settings</a></li>
            </ul>
            </nav>

            <div className="sidebar-profile">
            <img src={zeeshan_profile} alt="Dr. Z Chougle" className="sidebar-profile-pic" />
            <div className="sidebar-profile-name">Dr. Z Chougle</div>
            <button className="signout-button">➜</button> {/* This is a placeholder icon */}
            </div>

        </aside>


        <main className="settings">
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




        {/* Contact list */}
        <h1>Your Contacts</h1>
        <div className="contact-list">
          {contacts.map((contact, index) => (
            <div key={index} className="contact-item">
              <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-relationship">{contact.relationship}</div>
                {/* You can display other contact details here as well */}
              </div>
              <button className="edit-contact-btn">Edit</button>
              <button 
                className="remove-contact-btn"
                onClick={() => removeContact(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>




          <h1>Add New Contact</h1>
        <form className="contact-form">
          <div className="field">
            <label htmlFor="contactName">Contact Name</label>
            <input type="text" id="contactName" />
          </div>
          <div className="field">
            <label htmlFor="relationship">Relationship</label>
            <select id="relationship">
              <option value="family">Family</option>
              <option value="doctor">Doctor</option>
              <option value="caregiver">Caregiver</option>
              {/* More options as needed */}
            </select>
          </div>
          <div className="field">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="tel" id="phoneNumber" />
          </div>
          <div className="field">
            <label htmlFor="email">Email (optional)</label>
            <input type="email" id="email" />
          </div>
          <div className="field">
            <div className="checkbox-group">
              <input type="checkbox" id="glucoseAlert" />
              <label htmlFor="glucoseAlert">Glucose Level Alert</label>
              <input type="checkbox" id="medicationReminder" />
              <label htmlFor="medicationReminder">Medication Reminder</label>
            </div>
          </div>
         
          <button type="submit" className="save-contact-btn">Save Contact</button>
        </form>
          
          
        </main>
      </div>
    );
  }
  
  export default Settings;
