// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU_86kaUDYm8UW0et5W7SDo2xdErwSyaI",
  authDomain: "otp-verify-6f41a.firebaseapp.com",
  projectId: "otp-verify-6f41a",
  storageBucket: "otp-verify-6f41a.appspot.com",
  messagingSenderId: "374368587197",
  appId: "1:374368587197:web:6458d173327e4ff526d6d4",
  measurementId: "G-9BFHRY3R9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)