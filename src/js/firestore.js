import firebase from 'firebase/app';
import 'firebase/firestore';
console.log(':::Initialize firestore:::');
const config = {
  apiKey: process.env.API_KEY,
  authDomain: 'borregosconectados.firebaseapp.com',
  databaseURL: 'https://borregosconectados.firebaseio.com',
  projectId: 'borregosconectados',
  storageBucket: 'borregosconectados.appspot.com',
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};
firebase.initializeApp(config);
console.log('Firebase initialized', firebase.firestore() );

export default firebase.firestore();