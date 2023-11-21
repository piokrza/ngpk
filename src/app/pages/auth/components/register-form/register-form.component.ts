import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { RegisterForm } from '#pages/auth/models';
import { AuthFormService } from '#pages/auth/services';
import { AuthActions, AuthSelectors } from '#store/auth';

@Component({
  selector: 'ctrl-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  private readonly store: Store = inject(Store);

  public readonly form: FormGroup<RegisterForm> = inject(AuthFormService).registerForm;
  public readonly errorMessage$: Observable<string | null> = this.store.select(AuthSelectors.errorMessage).pipe(
    tap((errorMessage) => {
      typeof errorMessage === 'string' && setTimeout(() => this.store.dispatch(AuthActions.resetErrorMessage()), 4000);
    })
  );

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.store.dispatch(AuthActions.signUpWithEmailAndPassword({ payload: { email, password } }));
    this.form.reset();
  }
}
