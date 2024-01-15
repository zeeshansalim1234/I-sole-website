// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiZ7Vrim-xyTzGSGNNzBuwY1sEgXfBDJ8",
    authDomain: "i-sole-111bc.firebaseapp.com",
    projectId: "i-sole-111bc",
    storageBucket: "i-sole-111bc.appspot.com",
    messagingSenderId: "313746930031",
    appId: "1:313746930031:web:2818a000fdc430e566d09a",
    measurementId: "G-85VWQT9R6X"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

export { firestore };