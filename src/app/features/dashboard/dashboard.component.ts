import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { first } from 'rxjs';

import { DashboardFacade } from '#dashboard/data-access';

@Component({
  selector: 'ctrl-dashboard',
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
    this.dashboardFacade.initializeUserData$().pipe(first()).subscribe();
  }
}
