import { takeUntil } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { DestroyComponent } from '@standalone/components';
import { Email } from '@inbox/models';
import { DialogService } from 'primeng/dynamicdialog';
import { EmailReplyComponent } from '@inbox/components';
import { EmailService } from '@inbox/services';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
})
export class EmailShowComponent extends DestroyComponent {
  email!: Email;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private emailService: EmailService
  ) {
    super();

    this.activatedRoute.data
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: ({ email }: Data): void => (this.email = email) });
  }

  onReplyButtonClick(): void {
    const dialogRef = this.dialogService.open(EmailReplyComponent, {
      header: 'Reply',
      style: { width: '90%', maxWidth: '400px' },
      data: this.email,
    });

    dialogRef.onClose.subscribe({
      next: (replyEmailFormPayload: Email): void => {
        replyEmailFormPayload && this.emailService.sendEmail(replyEmailFormPayload).subscribe();
      },
    });
  }
}
