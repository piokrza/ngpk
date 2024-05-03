import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { tap } from 'rxjs';

import { EmailForm } from '@ngpk/email/model';
import { EmailFormService } from '@ngpk/email/service';
import { FormInputComponent } from '@ngpk/email/shared/components';

const imports = [ButtonModule, FormInputComponent, ReactiveFormsModule, InputTextareaModule];
const providers = [EmailFormService];

@Component({
  selector: 'ngpk-email-create',
  templateUrl: './email-create.component.html',
  standalone: true,
  providers,
  imports,
})
export class EmailCreateComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly emailFormService = inject(EmailFormService);

  createEmailForm!: FormGroup<EmailForm>;

  get formControls(): EmailForm {
    return this.createEmailForm.controls;
  }

  ngOnInit(): void {
    this.emailFormService.buildForm();
    this.emailFormService
      .form$()
      .pipe(
        tap((form: FormGroup<EmailForm>) => (this.createEmailForm = form)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  onSubmit(): void {
    this.dialogRef.close(this.createEmailForm.value);
  }
}
