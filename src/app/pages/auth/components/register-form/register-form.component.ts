import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthFormPayload } from '@auth/models/auth-form-payload.model';
import { RegisterForm } from '@auth/models/register-form.model';
import { AuthFormService } from '@auth/services/auth-form.service';
import { Store } from '@ngrx/store';
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
