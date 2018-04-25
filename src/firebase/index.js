import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDqkTod2mJ3glzKOJ-haFPhEJJ2FDYbWqo",
  authDomain: "vue-vs-react.firebaseapp.com",
  projectId: "vue-vs-react",
});

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true 
});

export const repoSnapshots = db.collection('repo-snapshots');
