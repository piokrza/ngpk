import { FileListComponent } from '../file-list/file-list.component';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';
import { tap } from 'rxjs';

import { ActionButtonsComponent } from '@ngpk/organizer/component/drive';
import { DriveFacadeService } from '@ngpk/organizer/service/drive';

const imports = [ActionButtonsComponent, FileListComponent];

@Component({
  selector: 'ngpk-drive',
  template: `
    <ngpk-action-buttons />
    <ngpk-file-list />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class DriveComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly driveFacadeService = inject(DriveFacadeService);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap((params: Params) => this.driveFacadeService.setParentId(params['id'] ?? '')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
