import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { isLightMode } from '#common/constants';
import { PersistanceService, ThemeService } from '#common/services';

@Component({
  selector: 'ctrl-theme-toggler',
  template: `
    <div class="container">
      {{ 'settings.selectTheme' | translate }}
      <p-toggleButton
        [(ngModel)]="isLightMode"
        (onChange)="toggleTheme()"
        [onIcon]="'pi pi-sun'"
        [offIcon]="'pi pi-moon'" />
    </div>
  `,
  styleUrls: ['./theme-toggler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeTogglerComponent implements OnInit {
  private readonly themeService: ThemeService = inject(ThemeService);

  public isLightMode: boolean | null = inject(PersistanceService).get(isLightMode);

  public ngOnInit(): void {
    this.themeService.setTheme(this.isLightMode);
  }

  public toggleTheme(): void {
    this.themeService.setTheme(this.isLightMode);
  }
}
