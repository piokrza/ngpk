import { ChangeDetectionStrategy, Component, DestroyRef, Signal, WritableSignal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { Environment } from 'apps/organizer/src/environments';
import { PrimeIcons } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';

import { IUser } from '@ngpk/auth-organizer/model';

import { connectState } from '#app/core/utils';
import { DriveFacadeService } from '#drive/services';

@Component({
  selector: 'org-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonsComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly environment = inject(Environment);
  private readonly driveFacadeService = inject(DriveFacadeService);

  readonly state = connectState(this.destroyRef, {
    parentId: this.driveFacadeService.parentId$,
    isProcessing: this.driveFacadeService.isProcessing$,
  });

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly isEditing: WritableSignal<boolean> = signal(false);
  readonly folderNameControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  private readonly user: Signal<IUser | null> = toSignal(this.driveFacadeService.user$, { initialValue: null });
  protected uploadUrl: string = this.environment.uploadUrl;

  uploadFile({ files }: FileUploadEvent): void {
    !this.isEditing() && this.isEditing.set(false);

    files.length &&
      this.driveFacadeService.uploadFile({
        file: files[0],
        uid: this.user()!.uid,
        parentId: this.state.parentId,
      });
  }

  addFolder(): void {
    this.driveFacadeService.uploadFolder({
      name: this.folderNameControl.value,
      uid: this.user()!.uid,
      parentId: this.state.parentId,
    });

    this.isEditing.set(false);
  }

  cancelEditing(): void {
    this.isEditing.set(false);
    this.folderNameControl.reset();
  }
}
