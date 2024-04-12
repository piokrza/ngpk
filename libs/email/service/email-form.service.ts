import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Validators } from '@angular/forms';

import { FormService } from '@ngpk/email/service';
import { AuthStateService } from '@ngpk/email/state/auth';

@Injectable()
export class EmailFormService extends FormService {
  private readonly username = toSignal(inject(AuthStateService).select('username'), { initialValue: '' });

  get config() {
    return {
      to: ['', [Validators.required, Validators.email]],
      from: { value: `${this.username()}@angular-email.com`, disabled: true },
      subject: ['', [Validators.required]],
      text: ['', [Validators.required]],
    };
  }
}
