import { ChangeDetectionStrategy, Component, OnInit, Signal, WritableSignal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, tap } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { PrimeIcons } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';

import { IUser } from '#auth/models';
import { DriveFacadeService } from '#drive/services';

@UntilDestroy()
@Component({
  selector: 'org-drive',
  templateUrl: './drive.component.html',
  styleUrl: './drive.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriveComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly driveFacadeService = inject(DriveFacadeService);

  readonly isProcessing$: Observable<boolean> = this.driveFacadeService.isProcessing$;

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly folderMode: WritableSignal<'initial' | 'edit'> = signal('initial');
  readonly folderNameControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });
  readonly parentId: Signal<string> = toSignal(this.driveFacadeService.parentId$, { initialValue: '' });

  private readonly user: Signal<IUser | null> = toSignal(this.driveFacadeService.user$, { initialValue: null });
  protected uploadUrl: string = env.uploadUrl;

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(({ id }) => this.driveFacadeService.setParentId(id ?? '')),
        untilDestroyed(this)
      )
      .subscribe();
  }

  uploadFile({ files }: FileUploadEvent): void {
    this.folderMode() === 'edit' && this.folderMode.set('initial');

    files.length &&
      this.driveFacadeService.uploadFile({
        file: files[0],
        uid: this.user()!.uid,
        parentId: this.parentId(),
      });
  }

  addFolder(): void {
    this.driveFacadeService.uploadFolder({
      name: this.folderNameControl.value,
      uid: this.user()!.uid,
      parentId: this.parentId(),
    });

    this.folderMode.set('initial');
  }
}
