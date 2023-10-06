// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDVLRF0238FnFnPJ84iVXvrQcaHsRfDJuE',
  authDomain: 'sieum-1408a.firebaseapp.com',
  projectId: 'sieum-1408a',
  storageBucket: 'sieum-1408a.appspot.com',
  messagingSenderId: '855914249050',
  appId: '1:855914249050:web:03e67834159f1d8d7f9163',
  measurementId: 'G-EWRCC49ZL9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
