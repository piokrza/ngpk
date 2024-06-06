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
import { LoginForm } from '@ngpk/organizer/model';
import { AuthFormService } from '@ngpk/organizer/service/auth';
import { AuthActions, AuthSelectors } from '@ngpk/organizer/state/auth';

const imports = [TranslateModule, ReactiveFormsModule, ButtonModule, PasswordModule, RouterLink, AsyncPipe, InputTextModule];

@Component({
  selector: 'ngpk-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class LoginFormComponent {
  private readonly store = inject(Store);

  readonly AuthPaths: typeof AuthPaths = AuthPaths;
  readonly form: FormGroup<LoginForm> = inject(AuthFormService).loginForm;
  readonly errorMessage$: Observable<string | null> = this.store.select(AuthSelectors.errorMessage);

  signinWithGoogle(): void {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(AuthActions.signInWithEmailAndPassword({ payload: this.form.getRawValue() }));
  }
}
