import { inject, Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { filter, Observable } from 'rxjs';

import { AuthFormPayload, IUser } from '#auth/models';
import { Collection } from '#core/enums';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly afAuth: AngularFireAuth = inject(AngularFireAuth);
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  async signinWithGoogle(): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  async signOut(): Promise<void> {
    return await this.afAuth.signOut();
  }

  async signInWithEmailAndPassword({ email, password }: AuthFormPayload): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signUpWithEmailAndPassword({ email, password }: AuthFormPayload): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loadUserData$(uid: string): Observable<IUser> {
    return this.angularFirestore.doc<IUser>(`${Collection.USERS}/${uid}`).valueChanges().pipe(filter(Boolean));
  }

  get authState$(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }
}
