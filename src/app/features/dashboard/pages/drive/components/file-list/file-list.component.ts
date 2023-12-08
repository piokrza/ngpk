import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { Observable, map, switchMap } from 'rxjs';

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
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  //TODO: move logic to service, add breadcrumbs

  @Output() fileClick = new EventEmitter<IFile>();

  public readonly files$: Observable<IFile[]> = this.filteredFiltes$;
  public readonly isLoading$: Observable<boolean> = this.driveFacade.isLoading$;

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  private filterFiles(files: IFile[] | null, id: string): IFile[] {
    if (files === null) return [];

    if (!id ?? ''.length) {
      return files.filter(({ parentId }) => (parentId ?? '') === '');
    } else {
      return files.filter(({ parentId }) => parentId === id);
    }
  }

  private get filteredFiltes$(): Observable<IFile[]> {
    return this.activatedRoute.params.pipe(
      switchMap((params: Params) => this.driveFacade.files$.pipe(map((files) => this.filterFiles(files, params['id']))))
    );
  }
}
