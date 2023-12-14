import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';

import { DriveFacadeService } from '#drive/data-access';
import { IFile } from '#drive/models';

@Component({
  selector: 'ctrl-file-list',
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent {
  protected location: Location = inject(Location);
  private readonly driveFacadeService: DriveFacadeService = inject(DriveFacadeService);

  public readonly files$: Observable<IFile[]> = this.driveFacadeService.files$;
  public readonly isLoading$: Observable<boolean> = this.driveFacadeService.isLoading$;
  public readonly parentFile$: Observable<IFile | undefined> = this.driveFacadeService.parentFile$;

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  public fileClick(file: IFile): void {
    this.driveFacadeService.fileClick(file);
  }
}
