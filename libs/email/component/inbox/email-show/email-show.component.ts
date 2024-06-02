import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EMPTY, map, switchMap } from 'rxjs';

import { BypassHtmlPipe } from '@ngpk/core/pipe';
import { connectState } from '@ngpk/core/util';
import { EmailReplyComponent } from '@ngpk/email/component/inbox';
import { Email } from '@ngpk/email/model';
import { EmailService } from '@ngpk/email/service';

const imports = [ButtonModule, ProgressSpinnerModule, BypassHtmlPipe];

@Component({
  selector: 'ngpk-email-show',
  templateUrl: './email-show.component.html',
  standalone: true,
  imports,
})
export class EmailShowComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly emailService = inject(EmailService);
  private readonly dialogService = inject(DialogService);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly state = connectState(this.destroyRef, {
    email: this.activatedRoute.data.pipe(map(({ email }) => email)),
  });

  onReplyButtonClick(): void {
    const dialogRef = this.dialogService.open(EmailReplyComponent, {
      header: 'Reply',
      style: { width: '90%', maxWidth: '400px' },
      data: this.state.email,
    });

    dialogRef.onClose
      .pipe(
        switchMap((replyEmailFormPayload: Email) => {
          return replyEmailFormPayload ? this.emailService.sendEmail(replyEmailFormPayload) : EMPTY;
        })
      )
      .subscribe();
  }
}
