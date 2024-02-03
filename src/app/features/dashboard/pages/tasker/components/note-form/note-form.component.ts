import { ChangeDetectionStrategy, Component, OnInit, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { IUser } from '#auth/models';
import { AuthSelectors } from '#auth/store';
import { Note, NoteForm } from '#tasker/models';
import { TaskerService } from '#tasker/services';

@Component({
  selector: 'org-note-form',
  templateUrl: './note-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteFormComponent implements OnInit {
  private readonly noteService = inject(TaskerService);
  private readonly firestore = inject(AngularFirestore);
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly updateNoteData?: Note = inject(DynamicDialogConfig).data;

  readonly isEditMode = signal(false);
  readonly form: FormGroup<NoteForm> = this.noteService.noteForm;
  private readonly user: Signal<IUser | null> = toSignal(inject(Store).select(AuthSelectors.user), { initialValue: null });

  ngOnInit(): void {
    this.isEditMode.set(Boolean(this.updateNoteData));

    this.isEditMode() &&
      this.form.patchValue({
        content: this.updateNoteData?.content,
        name: this.updateNoteData?.name,
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const note: Note = this.isEditMode()
      ? {
          ...this.updateNoteData!,
          content: this.form.controls.content.value,
          name: this.form.controls.name.value,
        }
      : {
          ...this.form.getRawValue(),
          id: this.firestore.createId(),
          uid: this.user()!.uid,
          createDate: Timestamp.fromDate(new Date()),
        };

    this.dialogRef.close(note);
  }

  get submitButtonLabel(): string {
    return `tasker.${this.isEditMode() ? 'edit' : 'add'}Note`;
  }
}
