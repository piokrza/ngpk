import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, catchError, filter, finalize, from, tap } from 'rxjs';

import { IUser } from '#auth/models';
import { ToastStatus } from '#common/enums';
import { ToastService } from '#common/services';
import { DriveApi, DriveState } from '#drive/data-access';
import { AuthSelectors } from '#store/auth';

@Injectable()
export class DriveFacade {
  private readonly store: Store = inject(Store);
  private readonly driveApi: DriveApi = inject(DriveApi);
  private readonly driveState: DriveState = inject(DriveState);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly translate: TranslateService = inject(TranslateService);

  public get isLoading$(): Observable<boolean> {
    return this.driveState.isLoading$;
  }

  public get percentage$(): Observable<number> {
    return this.driveState.progress$;
  }

  public get user$(): Observable<IUser> {
    return this.store.select(AuthSelectors.user).pipe(filter(Boolean));
  }

  public uploadFile$(file: File, uid: string) {
    this.driveState.setIsLoading(true);

    return from(this.driveApi.uploadFile(file, uid)).pipe(
      tap(() => {
        this.toastService.showMessage(
          ToastStatus.SUCCESS,
          this.translate.instant('toastMessage.success'),
          this.translate.instant('toastMessage.addFileSuccess')
        );
      }),
      catchError((): Observable<never> => {
        this.toastService.showMessage(
          ToastStatus.SUCCESS,
          this.translate.instant('toastMessage.error'),
          this.translate.instant('toastMessage.addFileError')
        );
        return EMPTY;
      }),
      finalize((): void => this.driveState.setIsLoading(false))
    );
  }
}
