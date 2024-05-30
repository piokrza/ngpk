import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { map } from 'rxjs';

import { themeLink } from '@ngpk/core/constant';
import { connectState } from '@ngpk/core/util';
import { ThemeType, AppConfig } from '@ngpk/organizer/model';
import { ConfigSelectors, ConfigActions } from '@ngpk/organizer/state/config';

const imports = [ToggleButtonModule, FormsModule, TranslateModule];

@Component({
  selector: 'ngpk-theme-toggler',
  templateUrl: './theme-toggler.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class ThemeTogglerComponent {
  constructor(
    private readonly store: Store,
    private readonly destroyRef: DestroyRef
  ) {
    this.themeLink = inject(DOCUMENT).getElementById(themeLink) as HTMLLinkElement;
  }

  readonly state = connectState(this.destroyRef, {
    config: this.store.select(ConfigSelectors.config),
    isLightMode: this.store.select(ConfigSelectors.theme).pipe(map((theme: ThemeType) => theme === 'light')),
  });

  private readonly themeLink: HTMLLinkElement;
  isLightMode: boolean = this.state.isLightMode;
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  toggleTheme(): void {
    this.themeLink.href = this.state.isLightMode ? 'light-theme.css' : 'dark-theme.css';

    if (!this.state.config) return;

    const config: AppConfig = {
      ...this.state.config,
      theme: this.state.config.theme === 'light' ? 'dark' : 'light',
    };

    this.store.dispatch(ConfigActions.updateConfig({ config }));
  }
}
