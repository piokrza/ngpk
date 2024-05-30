import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Observable } from 'rxjs';

import { AuthPaths } from '@ngpk/organizer/enum';
import { RegisterForm } from '@ngpk/organizer/model';
import { AuthFormService } from '@ngpk/organizer/service';
import { AuthActions, AuthSelectors } from '@ngpk/organizer/state/auth';

const imports = [TranslateModule, ReactiveFormsModule, ButtonModule, PasswordModule, RouterLink, AsyncPipe, InputTextModule];

@Component({
  selector: 'ngpk-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
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
