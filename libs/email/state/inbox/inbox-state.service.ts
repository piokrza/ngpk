import { Injectable } from '@angular/core';

import { Store } from '@ngpk/core/abstract';
import { InboxState } from '@ngpk/email/state/inbox';

@Injectable({ providedIn: 'root' })
export class InboxStateService extends Store<InboxState> {
  constructor() {
    super({
      emails: [],
      isLoading: false,
    });
  }
}
