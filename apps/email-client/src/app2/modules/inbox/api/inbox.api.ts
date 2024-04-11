import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailSummary, Email } from '@inbox/models';
import { Observable } from 'rxjs';
import { APP_SERVICE_CONFIG } from '@core/app-config';
import { AppConfig } from '@shared/models';

@Injectable()
export class InboxApi {
  constructor(@Inject(APP_SERVICE_CONFIG) private appConfig: AppConfig, private http: HttpClient) {}

  loadEmails$(): Observable<EmailSummary[]> {
    return this.http.get<EmailSummary[]>(`${this.appConfig.BASE_URL}/emails`);
  }

  loadEmailById$(id: string): Observable<Email> {
    return this.http.get<Email>(`${this.appConfig.BASE_URL}/emails/${id}`);
  }

  sendEmail(email: Email): Observable<any> {
    return this.http.post(`${this.appConfig.BASE_URL}/emails`, email);
  }
}
