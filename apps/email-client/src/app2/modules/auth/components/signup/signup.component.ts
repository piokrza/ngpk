import { Component, OnInit, Self } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { DestroyComponent } from '@standalone/components';
import { AuthService, SignupFormService } from '@auth/services';
import { SignupForm, SignupCredentials } from '@auth/models';
import { Router } from '@angular/router';
import { AuthState } from '@auth/state';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupFormService],
})
export class SignupComponent extends DestroyComponent implements OnInit {
  isAuthLoading$: Observable<boolean> = this.authState.getAuthLoading$();

  signupForm!: FormGroup<SignupForm>;

  constructor(
    @Self() private signupFormService: SignupFormService,
    private authService: AuthService,
    private router: Router,
    private authState: AuthState
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signupFormService.buildForm();
    this.signupFormService
      .form$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (form: FormGroup<SignupForm>) => (this.signupForm = form),
      });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    const signUpPayload: SignupCredentials = {
      username: this.signupForm.value.username!,
      password: this.signupForm.value.password!,
      passwordConfirmation: this.signupForm.value.passwordConfirmation!,
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

  get username(): FormControl<string> {
    return this.signupForm.controls.username;
  }

  get password(): FormControl<string> {
    return this.signupForm.controls.password;
  }

  get passwordConfirmation(): FormControl<string> {
    return this.signupForm.controls.passwordConfirmation;
  }
}
