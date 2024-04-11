import { Component, DestroyRef, OnInit, Self } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { EmailForm } from '@ngpk/email/model';
import { EmailFormService } from '@ngpk/email/service';
import { FormInputComponent } from '@ngpk/email/shared/components';

const imports = [ButtonModule, FormInputComponent, ReactiveFormsModule];

@Component({
  selector: 'ngpk-email-create',
  templateUrl: './email-create.component.html',
  providers: [EmailFormService],
  standalone: true,
  imports,
})
export class EmailCreateComponent implements OnInit {
  constructor(
    @Self() private readonly emailFormService: EmailFormService,
    private readonly dialogRef: DynamicDialogRef,
    private readonly destroyRef: DestroyRef
  ) {}

  createEmailForm!: FormGroup<EmailForm>;

  get to(): FormControl<string> {
    return this.createEmailForm.controls.to;
  }

  get from(): FormControl<string> {
    return this.createEmailForm.controls.from;
  }

  get subject(): FormControl<string> {
    return this.createEmailForm.controls.subject;
  }

  get text(): FormControl<string> {
    return this.createEmailForm.controls.text;
  }

  ngOnInit(): void {
    this.emailFormService.buildForm();
    this.emailFormService
      .form$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (form: FormGroup<EmailForm>) => (this.createEmailForm = form),
      });
  }

  onSubmit(): void {
    this.dialogRef.close(this.createEmailForm.value);
  }
}
