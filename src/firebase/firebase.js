import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyAmX7NztIP6rSPxyI4MQZuucgyjw3poQWY",
  authDomain: "cfs-racing-club.firebaseapp.com",
  databaseURL: "https://cfs-racing-club-default-rtdb.firebaseio.com",
  projectId: "cfs-racing-club",
  storageBucket: "cfs-racing-club.appspot.com",
  messagingSenderId: "398840133886",
  appId: "1:398840133886:web:252f27385dba8acfe8cdaf",
  measurementId: "G-L938VST90Z",
});

const storage = firebase.storage();
const storageRef = storage.ref();

export default storageRef;
