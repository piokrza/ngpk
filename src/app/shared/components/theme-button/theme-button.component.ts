import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { isLightMode } from '#common/constants';
import { ThemeService, PersistanceService } from '#common/services';

const imports = [ToggleButtonModule, FormsModule];

@Component({
  selector: 'ctrl-theme-button',
  templateUrl: './theme-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class ThemeButtonComponent {
  private readonly themeService: ThemeService = inject(ThemeService);

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  public isLightMode: boolean = !!inject(PersistanceService).get(isLightMode);

  public toggleTheme(): void {
    this.themeService.setTheme(this.isLightMode);
  }
}
