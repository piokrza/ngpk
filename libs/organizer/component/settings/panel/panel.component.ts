import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AccountSettingsComponent, ThemeTogglerComponent, LanguageTogglerComponent } from '@ngpk/organizer/component/settings';

const imports = [ThemeTogglerComponent, AccountSettingsComponent, LanguageTogglerComponent];

@Component({
  selector: 'ngpk-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class PanelComponent {}
