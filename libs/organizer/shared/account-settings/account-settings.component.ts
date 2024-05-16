import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { OrganizerPathFragment } from '@ngpk/organizer/enum';

@Component({
  selector: 'ngpk-account-settings',
  templateUrl: './account-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsComponent {
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly PathFragment: typeof OrganizerPathFragment = OrganizerPathFragment;
}
