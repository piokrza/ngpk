import { ChangeDetectionStrategy, Component, DestroyRef, WritableSignal, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Environment } from 'apps/organizer/src/environments';
import { PrimeIcons } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { filter } from 'rxjs';

import { connectState } from '@ngpk/core/util';
import { DriveFacadeService } from '@ngpk/drive/service';

@Component({
  selector: 'ngpk-action-buttons',
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
    user: this.driveFacadeService.user$.pipe(filter(Boolean)),
  });

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly isEditing: WritableSignal<boolean> = signal(false);
  readonly folderNameControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  protected uploadUrl: string = this.environment.uploadUrl;

  uploadFile({ files }: FileUploadEvent): void {
    !this.isEditing() && this.isEditing.set(false);

    files.length &&
      this.driveFacadeService.uploadFile({
        file: files[0],
        uid: this.state.user.uid,
        parentId: this.state.parentId,
      });
  }

  addFolder(): void {
    this.driveFacadeService.uploadFolder({
      name: this.folderNameControl.value,
      uid: this.state.user.uid,
      parentId: this.state.parentId,
    });

    this.isEditing.set(false);
  }

  cancelEditing(): void {
    this.isEditing.set(false);
    this.folderNameControl.reset();
  }
}
