import { inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class FormBase {
  #form!: FormGroup<any>;
  readonly #fb: FormBuilder = inject(FormBuilder);
  readonly #form$: BehaviorSubject<FormGroup<any>> = new BehaviorSubject<FormGroup<any>>(this.#form);

  protected customValidators = {};
  abstract get config(): any;

  public buildForm(): void {
    this.#form = this.#fb.group(this.config, this.customValidators);
    this.#form$?.next(this.#form);
  }

  public form$(): Observable<FormGroup> {
    return this.#form$.asObservable();
  }
}
