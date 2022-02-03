import firebase from 'firebase/app';
import 'firebase/auth';
// require('firebase/auth')

// import * as firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/firestore';
import 'firebase/firestore';

//enter your web app configuration options
const firebaseConfig = {
    apiKey: "AIzaSyB7NavKhDRCPOOiDHAgQcTomqHYuloJb-w",
    authDomain: "yammy-8bb20.firebaseapp.com",
    databaseURL: "https://yammy-8bb20.firebaseapp.com",
    projectId: "yammy-8bb20",
    storageBucket: "yammy-8bb20.appspot.com",
    messagingSenderId: "806661297207",
    appId: "1:806661297207:web:440607c0b347a9081cdbb2",
    measurementId: "G-CLDD005PDT"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };