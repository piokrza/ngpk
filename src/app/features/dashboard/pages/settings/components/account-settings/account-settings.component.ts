import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { PrimeIcons } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'org-account-settings',
  templateUrl: './account-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsComponent {
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
}
