import { ChangeDetectionStrategy, Component, OnInit, Signal, WritableSignal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PrimeIcons } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { Observable, tap } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { IUser } from '#auth/models';
import { FileUploadPayload } from '#drive/models';
import { DriveFacadeService } from '#drive/services';

@UntilDestroy()
@Component({
  selector: 'org-drive',
  templateUrl: './drive.component.html',
  styleUrl: './drive.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriveComponent implements OnInit {
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #driveFacadeService: DriveFacadeService = inject(DriveFacadeService);

  readonly isProcessing$: Observable<boolean> = this.#driveFacadeService.isProcessing$;

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly folderMode: WritableSignal<'initial' | 'edit'> = signal('initial');
  readonly folderNameControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });
  readonly parentId: Signal<string> = toSignal(this.#driveFacadeService.parentId$, { initialValue: '' });

  readonly #user: Signal<IUser | null> = toSignal(this.#driveFacadeService.user$, { initialValue: null });
  protected uploadUrl: string = env.uploadUrl;

  public ngOnInit(): void {
    this.#activatedRoute.params
      .pipe(
        tap(({ id }) => this.#driveFacadeService.setParentId(id ?? '')),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public uploadFile({ files }: FileUploadEvent): void {
    this.folderMode() === 'edit' && this.folderMode.set('initial');

    files.length &&
      this.#driveFacadeService.uploadFile({
        file: files[0],
        uid: this.#user()!.uid,
        parentId: this.parentId(),
      } satisfies FileUploadPayload);
  }

  public addFolder(): void {
    this.#driveFacadeService.uploadFolder({
      name: this.folderNameControl.value,
      uid: this.#user()!.uid,
      parentId: this.parentId(),
    });

    this.folderMode.set('initial');
  }
}
