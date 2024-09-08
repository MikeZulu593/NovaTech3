import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase-config';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  signOut() {
    return signOut(auth);
  }

  getCurrentUser() {
    return auth.currentUser;
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
}

