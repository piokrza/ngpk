import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { FormInputComponent } from '@ngpk/email/component/inbox';
import { EmailForm } from '@ngpk/email/model';

const imports = [ButtonModule, ReactiveFormsModule, FormInputComponent, NgIf, InputTextareaModule];

@Component({
  selector: 'ngpk-email-reply',
  templateUrl: './email-reply.component.html',
  standalone: true,
  imports,
})
export class EmailReplyComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig
  ) {}

  emailForm!: FormGroup<EmailForm>;
  emailDetails = this.dialogConfig.data;

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

  ngOnInit(): void {
    this.emailForm = this.buildReplyForm();
  }

  onSubmit(): void {
    this.dialogRef.close(this.emailForm.value);
  }

  buildReplyForm(): FormGroup {
    // TODO: add form type
    return this.formBuilder.group({
      from: { value: this.emailDetails?.to, disabled: true },
      to: this.emailDetails?.from,
      subject: `RE: ${this.emailDetails?.subject}`,
      text: `\n------- ${this.emailDetails?.from} wrote:\n> ${this.emailDetails?.text}`,
    });
  }
}
