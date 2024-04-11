import { Component, OnInit } from '@angular/core';
import { EmailService } from '@inbox/services';
import { InboxState } from '@inbox/state';
import { EmailSummary } from '@inbox/models';
import { DestroyComponent } from '@standalone/components';
import { switchMap, takeUntil, tap, Observable } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { EmailCreateComponent } from '@inbox/components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent extends DestroyComponent implements OnInit {
  emails!: EmailSummary[] | null;

  constructor(
    private emailService: EmailService,
    private inboxState: InboxState,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getEmails();
  }

  getEmails(): void {
    this.emailService
      .loadEmails$()
      .pipe(
        switchMap((): Observable<EmailSummary[] | null> => {
          return this.inboxState.getEmails$().pipe(
            tap((emails: EmailSummary[] | null) => (this.emails = emails)),
            takeUntil(this.destroy$)
          );
        })
      )
      .subscribe();
  }

  onCreateEmail(): void {
    const dialogRef = this.dialogService.open(EmailCreateComponent, {
      header: 'Create email',
      style: { width: '90%', maxWidth: '400px' },
    });

    dialogRef.onClose.subscribe({
      next: (createEmailFormPayload) =>
        createEmailFormPayload &&
        this.emailService.sendEmail(createEmailFormPayload).pipe(takeUntil(this.destroy$)).subscribe(),
    });
  }
}
