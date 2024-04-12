import { Injectable } from '@angular/core';

import { Store } from '@ngpk/core/abstract';
import { AuthState } from '@ngpk/email/state/auth';

@Injectable({ providedIn: 'root' })
export class AuthStateService extends Store<AuthState> {
  constructor() {
    super({
      username: '',
      isSignedIn: null,
      isLoading: false,
    });
  }
}
