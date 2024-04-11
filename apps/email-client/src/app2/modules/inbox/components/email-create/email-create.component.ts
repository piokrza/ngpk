import { takeUntil } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Self } from '@angular/core';
import { DestroyComponent } from '@standalone/components';
import { EmailFormService } from '@inbox/services';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmailForm } from '@inbox/models';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  providers: [EmailFormService],
})
export class EmailCreateComponent extends DestroyComponent implements OnInit {
  createEmailForm!: FormGroup<EmailForm>;

  constructor(@Self() private emailFormService: EmailFormService, private dialogRef: DynamicDialogRef) {
    super();
  }

  ngOnInit(): void {
    this.emailFormService.buildForm();
    this.emailFormService
      .form$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (form: FormGroup<EmailForm>) => (this.createEmailForm = form),
      });
  }

  onSubmit(): void {
    this.dialogRef.close(this.createEmailForm.value);
  }

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
}
