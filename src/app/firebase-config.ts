import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDh7KXLnXK-MXlP2dGqKlXX8UvUbY0ZJ9E',
  authDomain: 'app-angular-7f1ef.firebaseapp.com',
  databaseURL: 'https://app-angular-7f1ef-default-rtdb.firebaseio.com',
  projectId: 'app-angular-7f1ef',
  storageBucket: 'app-angular-7f1ef.appspot.com',
  messagingSenderId: '554042705460',
  appId: '1:554042705460:web:d9784e67b8d16a69202c61',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
