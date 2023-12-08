import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
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

  @Output() fileClick = new EventEmitter<IFile>();

  public readonly files$: Observable<IFile[]> = this.driveFacade.files$;
  public readonly parentId$: Observable<string> = this.driveFacade.parentId$;
  public readonly isLoading$: Observable<boolean> = this.driveFacade.isLoading$;

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
}
