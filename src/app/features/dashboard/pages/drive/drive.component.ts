import { ChangeDetectionStrategy, Component, Signal, WritableSignal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { Observable, map } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { IUser } from '#auth/models';
import { DriveFacade } from '#drive/data-access';

@Component({
  selector: 'ctrl-drive',
  templateUrl: './drive.component.html',
  styleUrl: './drive.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriveComponent {
  private readonly driveFacade: DriveFacade = inject(DriveFacade);

  private readonly user: Signal<IUser | null> = toSignal(this.driveFacade.user$, { initialValue: null });

  public folderMode: WritableSignal<'initial' | 'edit'> = signal('initial');
  public readonly folderNameControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  protected uploadUrl: string = env.uploadUrl;

  public uploadFile({ files }: FileUploadEvent): void {
    files.length && this.driveFacade.uploadFile(files[0], this.user()!.uid);
  }

  public addFolder(): void {
    this.folderMode.set('initial');
  }

  public get buttonIcon$(): Observable<string> {
    return this.driveFacade.isProcessing$.pipe(
      map((isProcessing) => (isProcessing ? this.PrimeIcons.SPINNER + ' pi-spin' : this.PrimeIcons.PLUS))
    );
  }
}
