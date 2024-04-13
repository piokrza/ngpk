import { inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class FormService {
  private _form!: FormGroup<any>;
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _form$: BehaviorSubject<FormGroup<any>> = new BehaviorSubject<FormGroup<any>>(this._form);

  protected customValidators = {};
  abstract get config(): any;

  public buildForm(): void {
    this._form = this._fb.group(this.config, this.customValidators);
    this._form$?.next(this._form);
  }

  public form$(): Observable<FormGroup> {
    return this._form$.asObservable();
  }
}
