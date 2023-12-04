import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { IUser } from '#auth/models';
import { AuthSelectors } from '#store/auth';
import { TaskerService } from '#tasker/data-access';
import { Note, NoteForm } from '#tasker/models';

@Component({
  selector: 'ctrl-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteFormComponent {
  private readonly noteService: TaskerService = inject(TaskerService);
  private readonly firestore: AngularFirestore = inject(AngularFirestore);
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  public readonly form: FormGroup<NoteForm> = this.noteService.noteForm;
  private readonly user: Signal<IUser | null> = toSignal(inject(Store).select(AuthSelectors.user), { initialValue: null });

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const newNote: Note = {
      ...this.form.getRawValue(),
      id: this.firestore.createId(),
      uid: this.user()!.uid,
    };

    this.dialogRef.close(newNote);
  }
}