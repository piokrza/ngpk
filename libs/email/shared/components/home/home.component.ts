import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EMPTY, switchMap, take } from 'rxjs';

import { connectState } from '@ngpk/core/util';
import { EmailService } from '@ngpk/email/service';
import { EmailCreateComponent, EmailIndexComponent } from '@ngpk/email/shared/components';
import { InboxStateService } from '@ngpk/email/state/inbox';

const imports = [ButtonModule, RouterOutlet, ProgressSpinnerModule, EmailIndexComponent];

@Component({
  selector: 'ngpk-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports,
})
export class HomeComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly emailService = inject(EmailService);
  private readonly dialogService = inject(DialogService);
  private readonly inboxStateService = inject(InboxStateService);

  readonly state = connectState(this.destroyRef, {
    emails: this.inboxStateService.select('emails'),
    isLoading: this.inboxStateService.select('isLoading'),
  });

  ngOnInit(): void {
    this.emailService.loadEmails$().pipe(take(1)).subscribe();
  }

  onCreateEmail(): void {
    const dialogRef = this.dialogService.open(EmailCreateComponent, {
      header: 'Create email',
      style: { width: '90%', maxWidth: '400px' },
    });

    dialogRef.onClose
      .pipe(
        switchMap((createEmailFormPayload) => (createEmailFormPayload ? this.emailService.sendEmail(createEmailFormPayload) : EMPTY)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
