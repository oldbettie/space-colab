// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBfLDb_DJmNo-CltXj0rRnIO-JCpucaDpU",
	authDomain: "ux-colab.firebaseapp.com",
	projectId: "ux-colab",
	storageBucket: "ux-colab.appspot.com",
	messagingSenderId: "258452111541",
	appId: "1:258452111541:web:e639c0cdf86e74b9f23efc",
	measurementId: "G-EEGZXPQKGJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
