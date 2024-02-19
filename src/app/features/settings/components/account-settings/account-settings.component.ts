import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PrimeIcons } from 'primeng/api';

import { DashboardPathFragments } from '#dashboard/enums';

@Component({
  selector: 'org-account-settings',
  templateUrl: './account-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsComponent {
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly DashboardPathFragments: typeof DashboardPathFragments = DashboardPathFragments;
}
