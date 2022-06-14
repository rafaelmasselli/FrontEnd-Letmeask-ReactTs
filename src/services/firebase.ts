import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDLndSamVhFTApfY7xV3vCV5dQNlYQT23c",
  authDomain: "letmeask-bd8ed.firebaseapp.com",
  databaseURL: "https://letmeask-bd8ed-default-rtdb.firebaseio.com",
  projectId: "letmeask-bd8ed",
  storageBucket: "letmeask-bd8ed.appspot.com",
  messagingSenderId: "70642815980",
  appId: "1:70642815980:web:506f940ebaab2e5779a6c9"
};
firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };
