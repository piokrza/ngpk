import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EMPTY, catchError, tap } from 'rxjs';

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
const providers = [SigninFormService];

@Component({
  selector: 'ngpk-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  standalone: true,
  providers,
  imports,
})
export class SigninComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly authStateService = inject(AuthStateService);
  private readonly signinFormService = inject(SigninFormService);

  signinForm!: FormGroup<SigninForm>;
  readonly isLoading$ = this.authStateService.select('isLoading');

  ngOnInit(): void {
    this.signinFormService.buildForm();
    this.signinFormService
      .form$()
      .pipe(
        tap((form: FormGroup<SigninForm>) => (this.signinForm = form)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  onSubmit(): void {
    const signInPayload: SigninCredencials = {
      username: this.signinForm.value.username ?? '',
      password: this.signinForm.value.password ?? '',
    };

    this.handleSignIn(signInPayload);
  }

  handleSignIn(signInPayload: SigninCredencials): void {
    this.authService
      .signIn$(signInPayload)
      .pipe(
        tap(() => void this.router.navigateByUrl('/inbox')),
        catchError((err: unknown) => {
          let messageDetails: string;

          if ((err as HttpErrorResponse).error.username) {
            messageDetails = 'Username not found';
          } else messageDetails = 'Invalid password';

          this.toastService.showInfoMessage(ToastStatus.WARN, 'Incorrect credentials', messageDetails);
          this.password.reset();

          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  get username(): FormControl<string> {
    return this.signinForm.controls.username;
  }

  get password(): FormControl<string> {
    return this.signinForm.controls.password;
  }
}
