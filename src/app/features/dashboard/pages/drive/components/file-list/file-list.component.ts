import { DrivePaths } from '../../enums';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';

import { AppPaths } from '#common/enums';
import { DashobardPaths } from '#dashboard/enums';
import { DriveFacade } from '#drive/data-access';
import { IFile } from '#drive/models';

@Component({
  selector: 'ctrl-file-list',
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent {
  private readonly router: Router = inject(Router);
  private readonly driveFacade: DriveFacade = inject(DriveFacade);

  public readonly files$: Observable<IFile[] | null> = this.driveFacade.files$;
  public readonly isLoading$: Observable<boolean> = this.driveFacade.isLoading$;

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  public itemClick(file: IFile): void {
    if (file.type === 'file') {
      window.open(file.url);
    } else {
      this.router.navigate([AppPaths.DASHBOARD, DashobardPaths.DRIVE, DrivePaths.DETAILS, file.id]);
    }
  }
}
