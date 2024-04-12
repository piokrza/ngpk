import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { BypassHtmlPipe } from '@ngpk/core/pipe';
import { Email } from '@ngpk/email/model';
import { EmailService } from '@ngpk/email/service';
import { EmailReplyComponent } from '@ngpk/email/shared/components';

const imports = [ButtonModule, ProgressSpinnerModule, BypassHtmlPipe];

@Component({
  selector: 'ngpk-email-show',
  templateUrl: './email-show.component.html',
  standalone: true,
  imports,
})
export class EmailShowComponent {
  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly emailService: EmailService,
    private readonly dialogService: DialogService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ email }: Data) => {
        this.email = email;
      },
    });
  }

  email!: Email;

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
