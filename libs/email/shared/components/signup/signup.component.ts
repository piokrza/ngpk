import { AsyncPipe, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, Self } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { tap } from 'rxjs';

import { SignupForm, SignupCredentials } from '@ngpk/email/model';
import { AuthService, SignupFormService } from '@ngpk/email/service';
import { FormContainerComponent, FormInputComponent } from '@ngpk/email/shared/components';
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
  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly authService: AuthService,
    private readonly authStateService: AuthStateService,
    @Self() private readonly signupFormService: SignupFormService
  ) {}

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
    this.authService.signUp$(signUpPayload).subscribe({
      next: () => {
        this.router.navigateByUrl('inbox');
      },

      error: (err: HttpErrorResponse) => {
        if (!err.status) {
          this.signupForm.setErrors({ noConnection: true });
        } else {
          this.signupForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
