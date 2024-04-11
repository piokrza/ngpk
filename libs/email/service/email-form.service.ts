import { AuthStateService } from '../state/auth';
import { Injectable, inject } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormService } from '@ngpk/email/service';

@Injectable()
export class EmailFormService extends FormService {
  private readonly username = inject(AuthStateService).state().username;

  get config(): any {
    return {
      to: ['', [Validators.required, Validators.email]],
      from: { value: `${this.username}@angular-email.com`, disabled: true },
      subject: ['', [Validators.required]],
      text: ['', [Validators.required]],
    };
  }
}
