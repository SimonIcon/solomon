import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTODOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    // storageBucket: "eshop-5a8f7.appspot.com",
    // messagingSenderId: process.env.REACT_APP_MESSAGINGSENDID,
    // appId: process.env.REACT_APP_APPID,
    // measurementId: process.env.REACT_APP_MEASUREMENTID
    apiKey: "AIzaSyB2BvSixWxuSlG3Z6tA3ETa3Ym4Ktfmi8I",
    authDomain: "fir-demo-ca789.firebaseapp.com",
    projectId: "fir-demo-ca789",
    storageBucket: "fir-demo-ca789.appspot.com",
    messagingSenderId: "824086405407",
    appId: "1:824086405407:web:0994347ad048aaee13902a",
    measurementId: "G-XLX0KBYSG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app)
