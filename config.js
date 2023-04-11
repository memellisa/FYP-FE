// FIREBASE

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// import {...} from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD5wNTFbUHECtsxWrsiGyfwzSBCxAQwIk8",
    authDomain: "heart-f1ee1.firebaseapp.com",
    projectId: "heart-f1ee1",
    storageBucket: "heart-f1ee1.appspot.com",
    messagingSenderId: "1005939249005",
    appId: "1:1005939249005:web:ec968bc4617cb0e1375464",
    measurementId: "G-EMYYPP6VCL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// export default app;

// FITBIT

export const fitbitConfig = {
    client_id: '23QW7N',
    client_secret: '08af734a9127adb92ffc86d88fc9adfe'
}