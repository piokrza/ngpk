import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, catchError, throwError, finalize } from 'rxjs';

import { InboxHttpService } from '@ngpk/email/api';
import { ToastStatus } from '@ngpk/email/enum';
import { Email, EmailSummary } from '@ngpk/email/model';
import { ToastService } from '@ngpk/email/service';
import { InboxStateService } from '@ngpk/email/state/inbox';

@Injectable()
export class EmailService {
  readonly #toastService = inject(ToastService);
  readonly #inboxHttpService = inject(InboxHttpService);
  readonly #inboxStateService = inject(InboxStateService);

  loadEmails$(): Observable<EmailSummary[]> {
    this.#inboxStateService.update('isLoading', true);

    return this.#inboxHttpService.loadEmails$().pipe(
      tap((emails: EmailSummary[]) => {
        this.#inboxStateService.update('emails', emails);
      }),
      catchError((err: HttpErrorResponse): Observable<never> => {
        this.#toastService.showInfoMessage(ToastStatus.WARN, 'Error', 'Problems with fetching emails');
        return throwError(() => err);
      }),
      finalize(() => this.#inboxStateService.update('isLoading', false))
    );
  }

  sendEmail(createEmailFormPayload: Email): Observable<Email> {
    return this.#inboxHttpService.sendEmail(createEmailFormPayload).pipe(
      tap(() => {
        this.#toastService.showInfoMessage(ToastStatus.SUCCESS, 'Success!', 'Email sent successfully');
      }),
      catchError((err: HttpErrorResponse): Observable<never> => {
        this.#toastService.showInfoMessage(ToastStatus.WARN, 'Ups!', 'Something went wrong...');
        return throwError(() => err);
      })
    );
  }
}
