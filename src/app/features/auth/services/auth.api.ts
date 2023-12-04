import { inject, Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { Observable, of, tap } from 'rxjs';

import { AuthFormPayload, IUser } from '#auth/models';
import { Collection } from '#common/enums';

@Injectable({ providedIn: 'root' })
export class AuthApi {
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

  public loadUserData$(user: firebase.User | null): Observable<IUser | undefined> {
    if (!user) return of(undefined);

    return this.angularFirestore.doc<IUser>(`${Collection.USERS}/${user.uid}`).valueChanges();
  }

  public get authState$(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  public addUserToDatabase$(user: IUser): Observable<firebase.firestore.DocumentSnapshot<IUser>> {
    const usersCollectionRef: AngularFirestoreCollection<IUser> = this.angularFirestore.collection(Collection.USERS);

    return usersCollectionRef
      .doc(user.uid)
      .get()
      .pipe(tap((data) => !data.exists && usersCollectionRef.doc(data.id).set(user)));
  }

  public async updateUser$(updatedUserData: IUser): Promise<void> {
    const user: AngularFirestoreDocument<IUser> = this.angularFirestore.collection<IUser>(Collection.USERS).doc(updatedUserData.uid);
    return await user.update(updatedUserData);
  }
}
