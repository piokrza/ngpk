import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { isLightMode } from '@common/constants/is-light-mode';
import { PersistanceService } from '@common/services/persistance.service';
import { ThemeService } from '@common/services/theme.service';

@Component({
  selector: 'ctrl-theme-toggler',
  template: `
    <div class="flex justify-between items-center">
      Dark/Light mode
      <p-toggleButton
        [(ngModel)]="isLightMode"
        (onChange)="themeService.setTheme(isLightMode)"
        [onIcon]="'pi pi-sun'"
        [offIcon]="'pi pi-moon'" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeTogglerComponent implements OnInit {
  public themeService: ThemeService = inject(ThemeService);

  public isLightMode: boolean | null = inject(PersistanceService).get(isLightMode);

  public ngOnInit(): void {
    this.themeService.setTheme(this.isLightMode);
  }
}
