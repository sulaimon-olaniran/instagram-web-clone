import firebase from 'firebase/app'
////import * as admin from 'firebase-admin'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/functions'

//const serviceAccount = require("./assets/os-instagram-clone-firebase-adminsdk-vqprw-ed78b188e7.json");


const firebaseConfig = {
    apiKey: "AIzaSyCanpIk4sr7T6D-avB7oonjZ1gOU7IvEks",
    authDomain: "os-instagram-clone.firebaseapp.com",
    databaseURL: "https://os-instagram-clone.firebaseio.com",
    projectId: "os-instagram-clone",
    storageBucket: "os-instagram-clone.appspot.com",
    messagingSenderId: "897413508655",
    appId: "1:897413508655:web:1dd7d75f786c1d49c4a0da",
    measurementId: "G-N820CFR3DW"
  };


firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ timestapsInSnapshots : true })

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://os-instagram-clone.firebaseio.com"
// });

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
export const analytics = firebase.analytics()
export const functions = firebase.functions()


export default firebase