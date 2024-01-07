import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { IUser } from '#auth/models';
import { AuthSelectors } from '#store/auth';
import { Note, NoteForm } from '#tasker/models';
import { TaskerService } from '#tasker/services';

@Component({
  selector: 'org-note-form',
  templateUrl: './note-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteFormComponent {
  readonly #noteService = inject(TaskerService);
  readonly #firestore = inject(AngularFirestore);
  readonly #dialogRef = inject(DynamicDialogRef);

  readonly form: FormGroup<NoteForm> = this.#noteService.noteForm;
  readonly #user: Signal<IUser | null> = toSignal(inject(Store).select(AuthSelectors.user), { initialValue: null });

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const newNote: Note = {
      ...this.form.getRawValue(),
      id: this.#firestore.createId(),
      uid: this.#user()!.uid,
      createDate: Timestamp.fromDate(new Date()),
    };

    this.#dialogRef.close(newNote);
  }
}
