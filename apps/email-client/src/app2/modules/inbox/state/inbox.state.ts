import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { EmailSummary } from '@inbox/models';

@Injectable({
  providedIn: 'root',
})
export class InboxState {
  emails$: BehaviorSubject<EmailSummary[] | null> = new BehaviorSubject<EmailSummary[] | null>(null);
  emailsLoading$: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

  getEmails$(): Observable<EmailSummary[] | null> {
    return this.emails$.asObservable();
  }

  setEmails(emails: EmailSummary[]): void {
    this.emails$.next(emails);
  }

  getEmailsLoading$(): Observable<boolean | null> {
    return this.emailsLoading$.asObservable();
  }

  setEmailsLoading(emails: boolean): void {
    this.emailsLoading$.next(emails);
  }
}
