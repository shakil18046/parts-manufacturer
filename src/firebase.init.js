// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
};
// const firebaseConfig = {
//     apiKey: "AIzaSyDWdVrjAbFkhf2WnP03Dssg1aAXc3aV0Uc",
//     authDomain: "assignment-twelve-ac886.firebaseapp.com",
//     projectId: "assignment-twelve-ac886",
//     storageBucket: "assignment-twelve-ac886.appspot.com",
//     messagingSenderId: "964333282327",
//     appId: "1:964333282327:web:01f3659fe4b58101002852"
//   };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;