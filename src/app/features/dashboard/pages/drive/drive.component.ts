import { ChangeDetectionStrategy, Component, OnInit, Signal, WritableSignal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PrimeIcons } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { Observable, map, tap } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { IUser } from '#auth/models';
import { DriveFacadeService } from '#drive/data-access';

@UntilDestroy()
@Component({
  selector: 'ctrl-drive',
  templateUrl: './drive.component.html',
  styleUrl: './drive.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriveComponent implements OnInit {
  private readonly driveFacadeService: DriveFacadeService = inject(DriveFacadeService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private readonly user: Signal<IUser | null> = toSignal(this.driveFacadeService.user$, { initialValue: null });

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  public readonly folderMode: WritableSignal<'initial' | 'edit'> = signal('initial');
  public readonly parentId: Signal<string> = toSignal(this.driveFacadeService.parentId$, { initialValue: '' });
  public readonly folderNameControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  protected uploadUrl: string = env.uploadUrl;

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(({ id }) => this.driveFacadeService.setParentId(id ?? '')),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public uploadFile({ files }: FileUploadEvent): void {
    this.folderMode() === 'edit' && this.folderMode.set('initial');

    files.length &&
      this.driveFacadeService.uploadFile({
        file: files[0],
        uid: this.user()!.uid,
        parentId: this.parentId(),
      });
  }

  public addFolder(): void {
    this.driveFacadeService.uploadFolder({
      name: this.folderNameControl.value,
      uid: this.user()!.uid,
      parentId: this.parentId(),
    });

    this.folderMode.set('initial');
  }

  public get buttonIcon$(): Observable<string> {
    return this.driveFacadeService.isProcessing$.pipe(
      map((isProcessing) => (isProcessing ? this.PrimeIcons.SPINNER + ' pi-spin' : this.PrimeIcons.PLUS))
    );
  }
}
