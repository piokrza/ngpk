import { inject, Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { AuthFormPayload } from '@auth/models/auth-form-payload.model';
import { ToastService } from '@common/services/toast.service';
import { ToastStatus } from '@app/common/enums/toast-status.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private afAuth: AngularFireAuth = inject(AngularFireAuth);
  private router: Router = inject(Router);
  private _toastService: ToastService = inject(ToastService);
  public get toastService(): ToastService {
    return this._toastService;
  }
  public set toastService(value: ToastService) {
    this._toastService = value;
  }

  public async signinWithGoogle(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  public async signOut(): Promise<void> {
    await this.afAuth.signOut();
  }

  public getAuthState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  // Sign in with email/password
  async signInWithEmailAndPassword(payload: AuthFormPayload): Promise<void> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(payload.email, payload.password);
      this.router.navigate(['dashboard']);
    } catch (error: any) {
      console.error(error);
    }
  }

  async signUp(email: string, password: string): Promise<void> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.sendVerificationMail();
    } catch (error: any) {
      this.toastService.showMessage(ToastStatus.ERROR, 'Error', 'Something went wrong during authentication');
    }
  }

  async sendVerificationMail(): Promise<void | firebase.User | null> {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
}
