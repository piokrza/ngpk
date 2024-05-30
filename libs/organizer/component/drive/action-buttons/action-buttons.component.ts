import { ChangeDetectionStrategy, Component, DestroyRef, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Environment } from 'apps/organizer-client/src/environments';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { filter } from 'rxjs';

import { connectState } from '@ngpk/core/util';
import { DriveFacadeService } from '@ngpk/organizer/service';

const imports = [FileUploadModule, ButtonModule, ReactiveFormsModule, TranslateModule, InputTextModule];

@Component({
  selector: 'ngpk-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
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
