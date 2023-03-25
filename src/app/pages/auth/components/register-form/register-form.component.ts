import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterForm } from '@auth/models/register-form.model';
import { AuthFormService } from '@auth/services/auth-form.service';
import { Store } from '@ngrx/store';

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

    this.form.reset();
  }
}
