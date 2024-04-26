import { Component, DestroyRef, OnInit, Self } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';

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
  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly dialogRef: DynamicDialogRef,
    @Self() private readonly emailFormService: EmailFormService
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
