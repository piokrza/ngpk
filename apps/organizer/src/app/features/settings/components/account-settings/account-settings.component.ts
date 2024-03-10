import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PrimeIcons } from 'primeng/api';

import { PathFragment } from '@ngpk/core/enum';

@Component({
  selector: 'org-account-settings',
  templateUrl: './account-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsComponent {
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly PathFragment: typeof PathFragment = PathFragment;
}
