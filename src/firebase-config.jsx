// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import process from "process";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyCFEvF05xfj_nUB-cF2rGGaB5XIq_WiRHQ",
  authDomain: "doan2-a4c3b.firebaseapp.com",
  databaseURL: "https://doan2-a4c3b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "doan2-a4c3b",
  storageBucket: "doan2-a4c3b.appspot.com",
  messagingSenderId: "373211777225",
  appId: "1:373211777225:web:5b85db623a0730060ca518"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// export default database;
const auth = getAuth(app);
export  { database, auth };
// const firestore = getFirestore(app);
// export default firestore;
