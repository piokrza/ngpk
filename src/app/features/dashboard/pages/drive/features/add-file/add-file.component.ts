import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FileUploadEvent } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { IUser } from '#auth/models';
import { DriveFacade } from '#drive/data-access';
import { IFile } from '#drive/models';

@Component({
  selector: 'ctrl-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFileComponent {
  private readonly driveFacade: DriveFacade = inject(DriveFacade);

  public readonly files$: Observable<IFile[] | null> = this.driveFacade.files$;
  public readonly isLoading$: Observable<boolean> = this.driveFacade.isLoading$;

  private readonly user: Signal<IUser | null> = toSignal(this.driveFacade.user$, { initialValue: null });

  protected uploadUrl: string = env.uploadUrl;

  public uploadFile({ files }: FileUploadEvent): void {
    files.length && this.driveFacade.uploadFile(files[0], this.user()!.uid);
  }
}
