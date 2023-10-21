import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthFormPayload, RegisterForm } from '@pages/auth/models';
import { AuthFormService } from '@pages/auth/services';
import { AuthActions } from '@store/auth';

@Component({
  selector: 'ctrl-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  private store: Store = inject(Store);
  public form: FormGroup<RegisterForm> = inject(AuthFormService).createRegisterForm();

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.store.dispatch(AuthActions.signUpWithEmailAndPassword({ payload: { email, password } as AuthFormPayload }));
    this.form.reset();
  }
}
