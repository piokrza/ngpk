import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthActions } from '@app/store/auth';
import { RegisterForm } from '@auth/models/register-form.model';
import { AuthFormService } from '@auth/services/auth-form.service';
import { Store } from '@ngrx/store';
import { AuthFormPayload } from '@auth/models/auth-form-payload.model';

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

    const payload: AuthFormPayload = {
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value,
    };

    this.store.dispatch(AuthActions.signUpWithEmailAndPassword({ payload }));

    this.form.reset();
  }
}
