import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';

import { DriveFacade } from '#drive/data-access';
import { IFile } from '#drive/models';

@Component({
  selector: 'ctrl-file-list',
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent {
  private readonly location: Location = inject(Location);
  private readonly driveFacade: DriveFacade = inject(DriveFacade);

  public readonly files$: Observable<IFile[]> = this.driveFacade.files$;
  public readonly isLoading$: Observable<boolean> = this.driveFacade.isLoading$;
  public readonly parentFile$: Observable<IFile | undefined> = this.driveFacade.parentFile$;

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  public fileClick(file: IFile): void {
    this.driveFacade.fileClick(file);
  }

  public navigateBack(): void {
    this.location.back();
  }
}
