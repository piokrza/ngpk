import { Injectable } from '@angular/core';

import { SignalState } from '@ngpk/core/abstract';
import { AuthState } from '@ngpk/email/state/auth';

@Injectable({ providedIn: 'root' })
export class AuthStateService extends SignalState<AuthState> {
  constructor() {
    super({
      username: '',
      isSignedIn: null,
      isLoading: false,
    });
  }
}
