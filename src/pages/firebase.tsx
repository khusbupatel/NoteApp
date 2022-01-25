// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcR-fKZEAfmzESw5Jv84hwDQrDUACLD2A",
  authDomain: "second-app-9c6fa.firebaseapp.com",
  projectId: "second-app-9c6fa",
  storageBucket: "second-app-9c6fa.appspot.com",
  messagingSenderId: "779996857076",
  appId: "1:779996857076:web:71455f84e474e0438354a1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;