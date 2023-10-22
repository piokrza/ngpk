import { AbstractControl } from '@angular/forms';

export function passwordMatchValidator(password: string, confirmPassword: string) {
  return (form: AbstractControl): { passwordMismatch: boolean } | null => {
    const passwordValue: string | undefined = form.get(password)?.value;
    const passwordConfirmationValue: string | undefined = form.get(confirmPassword)?.value;

    return passwordValue === passwordConfirmationValue ? null : { passwordMismatch: true };
  };
}
