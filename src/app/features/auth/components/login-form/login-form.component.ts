import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { AuthPaths } from '#auth/enums';
import { LoginForm } from '#auth/models';
import { AuthFormService } from '#auth/services';
import { AuthActions, AuthSelectors } from '#store/auth';

@UntilDestroy()
@Component({
  selector: 'org-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  readonly #store: Store = inject(Store);

  readonly AuthPaths: typeof AuthPaths = AuthPaths;
  readonly form: FormGroup<LoginForm> = inject(AuthFormService).loginForm;
  readonly errorMessage$: Observable<string | null> = this.#store.select(AuthSelectors.errorMessage).pipe(
    tap((errorMessage) => {
      typeof errorMessage === 'string' && setTimeout(() => this.#store.dispatch(AuthActions.resetErrorMessage()), 5000);
    })
  );

  public signinWithGoogle(): void {
    this.#store.dispatch(AuthActions.signInWithGoogle());
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.#store.dispatch(AuthActions.signInWithEmailAndPassword({ payload: this.form.getRawValue() }));
  }
}
