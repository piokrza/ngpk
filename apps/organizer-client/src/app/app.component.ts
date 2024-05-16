import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase/compat';
import { PrimeNGConfig } from 'primeng/api';
import { Observable, filter, tap } from 'rxjs';

import { AuthApiService } from '@ngpk/auth-organizer/api';
import { ConfigActions } from '@ngpk/auth-organizer/config/store';
import { AuthActions } from '@ngpk/auth-organizer/state';
import { CashFlowActions } from '@ngpk/cash-flow/state';
import { OrganizerThemeService } from '@ngpk/core/service';
import { DriveActions } from '@ngpk/organizer/state/drive';
import { OrganizerLayoutComponent } from '@ngpk/shared-ui/components';
import { TaskerActions } from '@ngpk/tasker/state';

const imports = [RouterModule, OrganizerLayoutComponent];

@Component({
  selector: 'app-root',
  template: `
    <ngpk-organizer-layout>
      <router-outlet />
    </ngpk-organizer-layout>
  `,
  standalone: true,
  imports,
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly primengConfig = inject(PrimeNGConfig);
  private readonly authApiService = inject(AuthApiService);
  private readonly translateService = inject(TranslateService);
  private readonly organizerThemeService = inject(OrganizerThemeService);

  ngOnInit(): void {
    this.setPrimeNgConfig();
    this.loadUserData$().subscribe();
    this.organizerThemeService.applyTheme$().subscribe();
  }

  private loadUserData$(): Observable<firebase.User> {
    return this.authApiService.authState$.pipe(
      filter(Boolean),
      tap(({ uid }) => {
        this.store.dispatch(DriveActions.loadFiles({ uid }));
        this.store.dispatch(AuthActions.loadUserData({ uid }));
        this.store.dispatch(ConfigActions.loadConfig({ uid }));
        this.store.dispatch(TaskerActions.loadBoards({ uid }));
        this.store.dispatch(CashFlowActions.loadCashFlow({ uid }));
      })
    );
  }

  private setPrimeNgConfig(): void {
    this.primengConfig.ripple = true;
    this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
  }
}
