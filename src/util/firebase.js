// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyDm651hnSR6b15BXzq8bv-lRTqH21-EO0c",
  authDomain: "diablo-weedqc.firebaseapp.com",
  databaseURL: "https://diablo-weedqc-default-rtdb.firebaseio.com",
  projectId: "diablo-weedqc",
  storageBucket: "diablo-weedqc.appspot.com",
  messagingSenderId: "571481675011",
  appId: "1:571481675011:web:c487b465e15f8561a74536"
};

// Initialize Firebase
function initFirebase() {
    if(!firebase.apps.length) {
        firebase.initializeApp(config);
    }
}

initFirebase();

export { firebase };
