import { SignalState } from '@ngpk/core/abstract';
import { InboxState } from '@ngpk/email/state/inbox';

export class InboxStateService extends SignalState<InboxState> {
  constructor() {
    super({
      emails: [],
      isLoading: false,
    });
  }
}
