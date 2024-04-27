import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Environment } from 'apps/email-client/src/environments';
import { Observable } from 'rxjs';

import { EmailSummary, Email } from '@ngpk/email/model';

@Injectable()
export class InboxApi {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(Environment);

  loadEmails$(): Observable<EmailSummary[]> {
    return this.http.get<EmailSummary[]>(`${this.environment.baseUrl}/emails`);
  }

  loadEmailById$(id: string): Observable<Email> {
    return this.http.get<Email>(`${this.environment.baseUrl}/emails/${id}`);
  }

  sendEmail(email: Email): Observable<any> {
    return this.http.post(`${this.environment.baseUrl}/emails`, email);
  }
}
