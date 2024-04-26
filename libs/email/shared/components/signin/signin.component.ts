import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, Self } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ToastStatus } from '@ngpk/email/enum';
import { SigninForm, SigninCredencials } from '@ngpk/email/model';
import { SigninFormService, AuthService, ToastService } from '@ngpk/email/service';
import { FormContainerComponent, FormInputComponent } from '@ngpk/email/shared/components';
import { AuthStateService } from '@ngpk/email/state/auth';

const imports = [
  ButtonModule,
  FormContainerComponent,
  FormInputComponent,
  ProgressSpinnerModule,
  RouterLink,
  ReactiveFormsModule,
  AsyncPipe,
];

@Component({
  selector: 'ngpk-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  providers: [SigninFormService],
  standalone: true,
  imports,
})
export class SigninComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly authStateService: AuthStateService,
    @Self() private readonly signinFormService: SigninFormService
  ) {}

  signinForm!: FormGroup<SigninForm>;
  isLoading$ = this.authStateService.select('isLoading');

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signinFormService.buildForm();
    this.signinFormService
      .form$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (form: FormGroup<SigninForm>) => (this.signinForm = form),
      });
  }

  onSubmit(): void {
    const signInPayload: SigninCredencials = {
      username: this.signinForm.value.username ?? '',
      password: this.signinForm.value.password ?? '',
    };

    this.handleSignIn(signInPayload);
  }

  handleSignIn(signInPayload: SigninCredencials): void {
    this.authService.signIn$(signInPayload).subscribe({
      next: () => this.router.navigateByUrl('/inbox'),

      error: ({ error }: HttpErrorResponse) => {
        let messageDetails: string;

        if (error.username) {
          messageDetails = 'Username not found';
        } else messageDetails = 'Invalid password';

        this.toastService.showInfoMessage(ToastStatus.WARN, 'Incorrect credentials', messageDetails);
        this.password.reset();
      },
    });
  }

  get username(): FormControl<string> {
    return this.signinForm.controls.username;
  }

  get password(): FormControl<string> {
    return this.signinForm.controls.password;
  }
}
