import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PrimeIcons } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';

const imports = [InputTextModule, FormsModule, TranslateModule, AutoFocusModule, DividerModule];

@Component({
  selector: 'org-browser',
  templateUrl: './browser.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class BrowserComponent {
  searchField = '';

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
}
