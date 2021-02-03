import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase/app";
import "firebase/auth";
import {FirebaseAuthProvider} from '@react-firebase/auth';


const config = {
  apiKey: "AIzaSyC4sxZlT-McTildwtxa8LV1lj7ZQhzOrs0",
  authDomain: "training-team-253916.firebaseapp.com",
  projectId: "training-team-253916",
  databaseURL: "",
  storageBucket: "training-team-253916.appspot.com",
  messagingSenderId: "492701958610",
  appId: "1:492701958610:web:4a30a1be93803701d3480b",
  measurementId: "G-DP6XDH9DTW"
};


ReactDOM.render(
  <FirebaseAuthProvider {...config} firebase={firebase}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </FirebaseAuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
