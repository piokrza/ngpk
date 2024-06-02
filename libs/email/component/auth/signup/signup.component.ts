import { AsyncPipe, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EMPTY, catchError, tap } from 'rxjs';

import { FormContainerComponent, FormInputComponent } from '@ngpk/email/component/inbox';
import { SignupForm, SignupCredentials } from '@ngpk/email/model';
import { AuthService, SignupFormService } from '@ngpk/email/service';
import { AuthStateService } from '@ngpk/email/state/auth';

const imports = [FormContainerComponent, ButtonModule, FormInputComponent, ProgressSpinnerModule, NgIf, ReactiveFormsModule, AsyncPipe];
const providers = [SignupFormService];

@Component({
  selector: 'ngpk-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: true,
  providers,
  imports,
})
export class SignupComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly authStateService = inject(AuthStateService);
  private readonly signupFormService = inject(SignupFormService);

  signupForm!: FormGroup<SignupForm>;
  readonly isLoading$ = this.authStateService.select('isLoading');

  get formControls(): SignupForm {
    return this.signupForm.controls;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signupFormService.buildForm();
    this.signupFormService
      .form$()
      .pipe(
        tap((form: FormGroup<SignupForm>) => (this.signupForm = form)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    const signUpPayload: SignupCredentials = {
      username: this.signupForm.value.username ?? '',
      password: this.signupForm.value.password ?? '',
      passwordConfirmation: this.signupForm.value.passwordConfirmation ?? '',
    };

    this.handleSignup(signUpPayload);
  }

  handleSignup(signUpPayload: SignupCredentials): void {
    this.authService
      .signUp$(signUpPayload)
      .pipe(
        tap(() => void this.router.navigateByUrl('inbox')),
        catchError((err: unknown) => {
          if (!(err as HttpErrorResponse).status) {
            this.signupForm.setErrors({ noConnection: true });
          } else {
            this.signupForm.setErrors({ unknownError: true });
          }
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
