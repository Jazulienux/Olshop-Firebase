import * as firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBShh8YaQdGinmfY68AsRMzWYloGSnpK64',
  authDomain: 'jonlineshop.firebaseapp.com',
  databaseURL: 'https://jonlineshop.firebaseio.com',
  projectId: 'jonlineshop',
  storageBucket: 'jonlineshop.appspot.com',
  messagingSenderId: '791856522940',
  appId: '1:791856522940:web:815e00ab4299aef2ca92b9',
  measurementId: 'G-RWP2NXP62D',
});

export default app;
