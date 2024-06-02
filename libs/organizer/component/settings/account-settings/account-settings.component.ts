import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { PathFragment } from '@ngpk/organizer/enum';

const imports = [ButtonModule, TranslateModule, RouterLink];

@Component({
  selector: 'ngpk-account-settings',
  templateUrl: './account-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class AccountSettingsComponent {
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly PathFragment: typeof PathFragment = PathFragment;
}
