import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginForm } from '@auth/models/login-form.model';
import { AuthFormService } from '@auth/services/auth-form.service';

@Component({
  selector: 'ctrl-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Input() public isLoginMode!: boolean;

  public form: FormGroup<LoginForm>;

  constructor() {
    this.form = inject(AuthFormService).createLoginForm();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.getRawValue());

    this.form.reset();
  }
}
