import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterForm } from '@auth/models/register-form.model';
import { AuthFormService } from '@auth/services/auth-form.service';
import { AuthFormPayload } from '@auth/models/auth-form-payload.model';

@Component({
  selector: 'ctrl-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  public form: FormGroup<RegisterForm> = inject(AuthFormService).createRegisterForm();

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.reset();
  }
}
