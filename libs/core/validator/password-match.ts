import { AbstractControl } from '@angular/forms';

export function passwordMatchValidator(passwordControlName: string, passwordConfirmationControlName: string) {
  return (form: AbstractControl): { passwordMismatch: boolean } | null => {
    const passwordValue: string | undefined = form.get(passwordControlName)?.value;
    const passwordConfirmationValue: string | undefined = form.get(passwordConfirmationControlName)?.value;

    return passwordValue === passwordConfirmationValue ? null : { passwordMismatch: true };
  };
}
