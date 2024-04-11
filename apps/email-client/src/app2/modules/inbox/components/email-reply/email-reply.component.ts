import { EmailForm } from '@inbox/models';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DestroyComponent } from '@standalone/components';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
})
export class EmailReplyComponent extends DestroyComponent implements OnInit {
  emailForm!: FormGroup<EmailForm>;
  emailDetails = this.dialogConfig.data;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.emailForm = this.buildReplyForm();
  }

  onSubmit(): void {
    this.dialogRef.close(this.emailForm.value);
  }

  buildReplyForm(): FormGroup {
    return this.formBuilder.group({
      from: { value: this.emailDetails?.to, disabled: true },
      to: this.emailDetails?.from,
      subject: `RE: ${this.emailDetails?.subject!}`,
      text: `\n------- ${this.emailDetails?.from} wrote:\n> ${this.emailDetails?.text}`,
    });
  }

  get from(): FormControl<string> {
    return this.emailForm.controls.from;
  }

  get to(): FormControl<string> {
    return this.emailForm.controls.to;
  }

  get subject(): FormControl<string> {
    return this.emailForm.controls.subject;
  }

  get text(): FormControl<string> {
    return this.emailForm.controls.text;
  }
}
