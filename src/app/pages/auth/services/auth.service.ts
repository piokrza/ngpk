import { inject, Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthFormPayload } from '@auth/models/auth-form-payload.model';
import { ToastService } from '@common/services/toast.service';
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private afAuth: AngularFireAuth = inject(AngularFireAuth);
  private router: Router = inject(Router);
  private toastService: ToastService = inject(ToastService);

  public async signinWithGoogle(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  public async signOut(): Promise<void> {
    await this.afAuth.signOut();
  }

  public async signInWithEmailAndPassword(payload: AuthFormPayload): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.signInWithEmailAndPassword(payload.email, payload.password);
  }

  public async signUpWithEmailAndPassword(payload: AuthFormPayload): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.createUserWithEmailAndPassword(payload.email, payload.password);
  }

  public getAuthState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }
}
