import { IFile } from './models';
import { ChangeDetectionStrategy, Component, Signal, WritableSignal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { Observable, map } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { IUser } from '#auth/models';
import { AppPaths } from '#common/enums';
import { DashobardPaths } from '#dashboard/enums';
import { DriveFacade } from '#drive/data-access';

@Component({
  selector: 'ctrl-drive',
  templateUrl: './drive.component.html',
  styleUrl: './drive.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriveComponent {
  private readonly router: Router = inject(Router);
  private readonly driveFacade: DriveFacade = inject(DriveFacade);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private readonly user: Signal<IUser | null> = toSignal(this.driveFacade.user$, { initialValue: null });

  public readonly folderMode: WritableSignal<'initial' | 'edit'> = signal('initial');
  public readonly folderNameControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });
  public readonly parentId: Signal<string> = toSignal(this.activatedRoute.params.pipe(map((params: Params) => params['id'] ?? '')), {
    initialValue: '',
  });

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  protected uploadUrl: string = env.uploadUrl;

  public uploadFile({ files }: FileUploadEvent): void {
    this.folderMode() === 'edit' && this.folderMode.set('initial');

    files.length &&
      this.driveFacade.uploadFile({
        file: files[0],
        uid: this.user()!.uid,
        parentId: this.parentId(),
      });
  }

  public addFolder(): void {
    this.driveFacade.uploadFolder({
      name: this.folderNameControl.value,
      uid: this.user()!.uid,
      parentId: this.parentId(),
    });

    this.folderMode.set('initial');
  }

  public onFileClick(file: IFile): void {
    if (file.type === 'file') {
      window.open(file.url);
    } else {
      this.router.navigate([AppPaths.DASHBOARD, DashobardPaths.DRIVE, file.id]);
    }
  }

  public get buttonIcon$(): Observable<string> {
    return this.driveFacade.isProcessing$.pipe(
      map((isProcessing) => (isProcessing ? this.PrimeIcons.SPINNER + ' pi-spin' : this.PrimeIcons.PLUS))
    );
  }
}
