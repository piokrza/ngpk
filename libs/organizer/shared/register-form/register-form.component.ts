import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthPaths } from '@ngpk/organizer/enum';
import { RegisterForm } from '@ngpk/organizer/model';
import { AuthFormService } from '@ngpk/organizer/service';
import { AuthActions, AuthSelectors } from '@ngpk/organizer/state/auth';

@Component({
  selector: 'ngpk-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  private readonly store = inject(Store);

  readonly AuthPaths: typeof AuthPaths = AuthPaths;
  readonly form: FormGroup<RegisterForm> = inject(AuthFormService).registerForm;
  readonly errorMessage$: Observable<string | null> = this.store.select(AuthSelectors.errorMessage);

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.store.dispatch(AuthActions.signUpWithEmailAndPassword({ payload: { email, password } }));
    this.form.reset();
  }
}
