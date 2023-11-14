import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { isLightMode } from '#common/constants';
import { PersistanceService, ThemeService } from '#common/services';

@Component({
  selector: 'ctrl-theme-toggler',
  template: `
    <div class="container">
      {{ 'settings.selectTheme' | translate }}
      <p-toggleButton [(ngModel)]="isLightMode" (onChange)="toggleTheme()" [onIcon]="'pi pi-sun'" [offIcon]="'pi pi-moon'" />
    </div>
  `,
  styleUrl: './theme-toggler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeTogglerComponent {
  private readonly themeService: ThemeService = inject(ThemeService);

  public isLightMode: boolean | null = inject(PersistanceService).get(isLightMode);

  public toggleTheme(): void {
    this.themeService.setTheme(this.isLightMode);
  }
}