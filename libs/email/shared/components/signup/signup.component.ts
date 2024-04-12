import { AsyncPipe, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, Self } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SignupForm, SignupCredentials } from '@ngpk/email/model';
import { AuthService, SignupFormService } from '@ngpk/email/service';
import { FormContainerComponent, FormInputComponent } from '@ngpk/email/shared/components';
import { AuthStateService } from '@ngpk/email/state/auth';

const imports = [FormContainerComponent, ButtonModule, FormInputComponent, ProgressSpinnerModule, NgIf, ReactiveFormsModule, AsyncPipe];

@Component({
  selector: 'ngpk-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: true,
  providers: [SignupFormService],
  imports,
})
export class SignupComponent implements OnInit {
  constructor(
    @Self() private readonly signupFormService: SignupFormService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly authStateService: AuthStateService,
    private readonly destroyRef: DestroyRef
  ) {}

  signupForm!: FormGroup<SignupForm>;
  isLoading$ = this.authStateService.select('isLoading');

  get username(): FormControl<string> {
    return this.signupForm.controls.username;
  }

  get password(): FormControl<string> {
    return this.signupForm.controls.password;
  }

  get passwordConfirmation(): FormControl<string> {
    return this.signupForm.controls.passwordConfirmation;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signupFormService.buildForm();
    this.signupFormService
      .form$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (form: FormGroup<SignupForm>) => (this.signupForm = form),
      });
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
      next: (): void => {
        this.router.navigateByUrl('inbox');
      },

      error: (err: HttpErrorResponse): void => {
        if (!err.status) {
          this.signupForm.setErrors({ noConnection: true });
        } else {
          this.signupForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
