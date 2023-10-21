import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormOne, FormTwo, Form } from '@shared/components/parent-form/models';

@Injectable()
export class FormService {
  private fb: FormBuilder = inject(FormBuilder);

  public buildForm(): FormGroup<Form> {
    return this.fb.group<Form>({
      one: this.buildFormOne(),
      two: this.buildFormTwo(),
    });
  }

  public markAllAsDirty(formGroup: FormGroup<any>): void {
    Object.keys(formGroup.controls).forEach((key: string): void => {
      const control: AbstractControl | null = formGroup.get(key);
      control && control instanceof FormGroup ? this.markAllAsDirty(control) : control!.markAsDirty();
    });
  }

  private buildFormOne(): FormGroup<FormOne> {
    return this.fb.group({
      oneOne: this.fb.nonNullable.control('', { validators: [Validators.required] }),
      oneTwo: this.fb.nonNullable.control('', { validators: [Validators.required] }),
      oneThree: this.fb.nonNullable.control('', { validators: [Validators.required] }),
    });
  }

  private buildFormTwo(): FormGroup<FormTwo> {
    return this.fb.group({
      twoOne: this.fb.nonNullable.control('', { validators: [Validators.required] }),
      twoTwo: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.email] }),
    });
  }
}
