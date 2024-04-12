import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { take } from 'rxjs';

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
  constructor(
    private readonly emailService: EmailService,
    private readonly inboxStateService: InboxStateService,
    private readonly dialogService: DialogService,
    private readonly destroyRef: DestroyRef
  ) {}

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

    dialogRef.onClose.subscribe({
      next: (createEmailFormPayload) => {
        createEmailFormPayload && this.emailService.sendEmail(createEmailFormPayload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
      },
    });
  }
}
