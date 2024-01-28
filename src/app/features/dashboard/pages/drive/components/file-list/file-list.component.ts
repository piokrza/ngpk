import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';

import { PrimeIcons } from 'primeng/api';

import { connectState } from '#core/utils';
import { IFile } from '#drive/models';
import { DriveFacadeService } from '#drive/services';

@Component({
  selector: 'org-file-list',
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent {
  private readonly location = inject(Location);
  private readonly destroyRef = inject(DestroyRef);
  private readonly driveFacadeService = inject(DriveFacadeService);

  readonly state = connectState(this.destroyRef, {
    files: this.driveFacadeService.files$,
    isLoading: this.driveFacadeService.isLoading$,
    parentFile: this.driveFacadeService.parentFile$,
  });

  readonly nameLimit = 12;
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  fileClick(file: IFile): void {
    this.driveFacadeService.fileClick(file);
  }

  navigateBack(): void {
    this.location.back();
  }
}
