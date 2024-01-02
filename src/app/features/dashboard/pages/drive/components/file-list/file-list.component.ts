import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { PrimeIcons } from 'primeng/api';

import { IFile } from '#drive/models';
import { DriveFacadeService } from '#drive/services';

@Component({
  selector: 'org-file-list',
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent {
  protected location: Location = inject(Location);
  readonly #driveFacadeService: DriveFacadeService = inject(DriveFacadeService);

  readonly files$: Observable<IFile[]> = this.#driveFacadeService.files$;
  readonly isLoading$: Observable<boolean> = this.#driveFacadeService.isLoading$;
  readonly parentFile$: Observable<IFile | undefined> = this.#driveFacadeService.parentFile$;

  readonly nameLimit = 12;
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  public fileClick(file: IFile): void {
    this.#driveFacadeService.fileClick(file);
  }
}
