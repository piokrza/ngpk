import { inject, Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { Observable, of } from 'rxjs';

import { AuthFormPayload, User } from '#auth/models';
import { Collection } from '#common/enums';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly afAuth: AngularFireAuth = inject(AngularFireAuth);
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  public async signinWithGoogle(): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  public async signOut(): Promise<void> {
    return await this.afAuth.signOut();
  }

  public async signInWithEmailAndPassword({ email, password }: AuthFormPayload): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  public async signUpWithEmailAndPassword({ email, password }: AuthFormPayload): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  public loadUserData$(user: firebase.User | null): Observable<User | undefined> {
    if (!user) return of(undefined);

    return this.angularFirestore.doc<User>(`${Collection.USERS}/${user.uid}`).valueChanges();
  }

  public get authState$(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }
}
