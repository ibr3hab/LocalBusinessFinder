import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCf5wTJExdBo9HYbydeMPRiAVDswMZSQow",
    authDomain: "localbusinessfinderapp.firebaseapp.com",
    projectId: "localbusinessfinderapp",
    storageBucket: "localbusinessfinderapp.appspot.com",
    messagingSenderId: "948370092995",
    appId: "1:948370092995:web:ce8e712d7f72b5a8920376",
    measurementId: "G-SD0V65ZGH4"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth (app);

export {db , auth}