import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { LoginForm } from '#pages/auth/models';
import { AuthFormService } from '#pages/auth/services';
import { AuthActions } from '#store/auth';

@Component({
  selector: 'ctrl-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private readonly store: Store = inject(Store);

  public readonly form: FormGroup<LoginForm> = inject(AuthFormService).loginForm;

  public signinWithGoogle(): void {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(AuthActions.signInWithEmailAndPassword({ payload: this.form.getRawValue() }));
  }
}
