import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthState } from '@auth/state';
import { FormService } from '@shared/services';
import { take } from 'rxjs';

@Injectable()
export class EmailFormService extends FormService {
  private username!: string;

  constructor(private authState: AuthState) {
    super();
    this.authState
      .getUsername$()
      .pipe(take(1))
      .subscribe({
        next: (username: string): string => (this.username = username),
      });
  }

  get config(): any {
    return {
      to: ['', [Validators.required, Validators.email]],
      from: { value: `${this.username}@angular-email.com`, disabled: true },
      subject: ['', [Validators.required]],
      text: ['', [Validators.required]],
    };
  }
}
