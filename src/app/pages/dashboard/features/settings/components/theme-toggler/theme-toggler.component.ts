import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { isLightMode } from '#common/constants';
import { PersistanceService, ThemeService } from '#common/services';

@Component({
  selector: 'ctrl-theme-toggler',
  templateUrl: './theme-toggler.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeTogglerComponent {
  private readonly themeService: ThemeService = inject(ThemeService);

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  public isLightMode: boolean = !!inject(PersistanceService).get(isLightMode);

  public toggleTheme(): void {
    this.themeService.setTheme(this.isLightMode);
  }
}
