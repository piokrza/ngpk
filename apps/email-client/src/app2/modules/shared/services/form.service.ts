import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class FormService {
  private _fb: FormBuilder = inject(FormBuilder);
  private _form!: FormGroup<any>;
  private _form$: BehaviorSubject<FormGroup<any>> = new BehaviorSubject<FormGroup<any>>(this._form);

  protected customValidators: Object = {};
  abstract get config(): any;

  public buildForm(): void {
    this._form = this._fb.group(this.config, this.customValidators);
    this._form$?.next(this._form);
  }

  public form$(): Observable<FormGroup> {
    return this._form$.asObservable();
  }
}
