import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTODOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: "eshop-5a8f7.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app)
