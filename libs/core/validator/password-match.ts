import { AbstractControl } from '@angular/forms';

export function passwordMatchValidator(controlNameOne: string, controlNameTwo: string) {
  return (form: AbstractControl): { passwordMismatch: boolean } | null => {
    const passwordValue: string | undefined = form.get(controlNameOne)?.value;
    const passwordConfirmationValue: string | undefined = form.get(controlNameTwo)?.value;

    return passwordValue === passwordConfirmationValue ? null : { passwordMismatch: true };
  };
}
