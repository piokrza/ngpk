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
  private readonly driveFacade: DriveFacade = inject(DriveFacade);

  public readonly files$: Observable<IFile[] | null> = this.driveFacade.files$;
  public readonly isLoading$: Observable<boolean> = this.driveFacade.isLoading$;

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  public itemClick(fileUrl?: string): void {
    fileUrl && window.open(fileUrl);
  }
}
