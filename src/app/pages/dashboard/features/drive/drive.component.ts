import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FileUploadEvent } from 'primeng/fileupload';
import { Observable, switchMap } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { IUser } from '#auth/models';
import { DriveFacade } from '#drive/data-access';

@UntilDestroy()
@Component({
  selector: 'ctrl-drive',
  templateUrl: './drive.component.html',
  styleUrl: './drive.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriveComponent {
  private readonly driveFacade: DriveFacade = inject(DriveFacade);

  public readonly isLoading$: Observable<boolean> = this.driveFacade.isLoading$;
  private readonly user$: Observable<IUser> = this.driveFacade.user$;

  protected uploadUrl: string = env.uploadUrl;

  public uploadFile({ files }: FileUploadEvent): void {
    this.user$
      .pipe(
        switchMap(({ uid }) => this.driveFacade.uploadFile$(files[0], uid)),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
