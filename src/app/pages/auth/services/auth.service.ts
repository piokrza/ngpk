import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private afAuth: AngularFireAuth = inject(AngularFireAuth);

  public async signinWithGoogle(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  public async signOut(): Promise<void> {
    await this.afAuth.signOut();
  }

  public getAuthState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }
}
