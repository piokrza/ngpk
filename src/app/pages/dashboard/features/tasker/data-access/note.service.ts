import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NoteForm } from '#pages/dashboard/features/tasker/models';

@Injectable({ providedIn: 'root' })
export class NoteService {
  public get noteForm(): FormGroup<NoteForm> {
    return new FormGroup({
      name: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
      content: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    });
  }
}
