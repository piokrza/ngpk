import { FormGroup, AbstractControl } from '@angular/forms';

export function markAllAsDirty(formGroup: FormGroup<any>): void {
  Object.keys(formGroup.controls).forEach((key: string): void => {
    const control: AbstractControl | null = formGroup.get(key);
    control instanceof FormGroup ? markAllAsDirty(control) : control?.markAsDirty();
  });
}
