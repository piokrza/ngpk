import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { DashboardFacade } from '#dashboard/data-access';

@UntilDestroy()
@Component({
  selector: 'ctrl-dashboard-view',
  template: `
    <ctrl-layout>
      <router-outlet />
    </ctrl-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly dashboardFacade = inject(DashboardFacade);

  public ngOnInit(): void {
    this.dashboardFacade.initializeUserData$().pipe(untilDestroyed(this)).subscribe();
  }
}
