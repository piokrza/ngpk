import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { Observable, switchMap } from 'rxjs';

import { DriveFacade } from '#drive/data-access';
import { IFile } from '#drive/models';

@Component({
  selector: 'ctrl-folder-details',
  templateUrl: './folder-details.component.html',
})
export class FolderDetailsComponent {
  private readonly driveFacade: DriveFacade = inject(DriveFacade);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public readonly folderDetails$: Observable<IFile | undefined> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => this.driveFacade.getFolderDetails$(params['id']))
  );

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
}
