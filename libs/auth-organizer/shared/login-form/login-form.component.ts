import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthPaths } from '@ngpk/auth-organizer/enum';
import { LoginForm } from '@ngpk/auth-organizer/model';
import { AuthFormService } from '@ngpk/auth-organizer/service';
import { AuthActions, AuthSelectors } from '@ngpk/auth-organizer/state';

@Component({
  selector: 'ngpk-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private readonly store = inject(Store);

  readonly AuthPaths: typeof AuthPaths = AuthPaths;
  readonly form: FormGroup<LoginForm> = inject(AuthFormService).loginForm;
  readonly errorMessage$: Observable<string | null> = this.store.select(AuthSelectors.errorMessage);

  signinWithGoogle(): void {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(AuthActions.signInWithEmailAndPassword({ payload: this.form.getRawValue() }));
  }
}
