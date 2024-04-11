import { Component, OnInit, Self } from '@angular/core';
import { SigninFormService, AuthService } from '@auth/services';
import { FormGroup, FormControl } from '@angular/forms';
import { DestroyComponent } from '@standalone/components';
import { Observable, takeUntil } from 'rxjs';
import { SigninForm } from '@auth/models';
import { ToastService } from '@shared/services';
import { ToastStatus } from '@shared/enums';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthState } from '@auth/state';
import { SigninCredencials } from '@auth/models';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [SigninFormService],
})
export class SigninComponent extends DestroyComponent implements OnInit {
  isAuthLoading$: Observable<boolean> = this.authState.getAuthLoading$();

  signinForm!: FormGroup<SigninForm>;

  constructor(
    @Self() private signinFormService: SigninFormService,
    private authService: AuthService,
    private authState: AuthState,
    private toastService: ToastService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signinFormService.buildForm();
    this.signinFormService
      .form$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (form: FormGroup<SigninForm>) => (this.signinForm = form),
      });
  }

  onSubmit(): void {
    const signInPayload: SigninCredencials = {
      username: this.signinForm.value.username!,
      password: this.signinForm.value.password!,
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

        this.toastService.showInfoMessage(ToastStatus.WARN, 'Incorrect credentials', messageDetails!);
        this.password!.reset();
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
