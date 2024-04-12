import { EmailSummary } from '@ngpk/email/model';

export interface InboxState {
  emails: EmailSummary[];
  isLoading: boolean;
}
