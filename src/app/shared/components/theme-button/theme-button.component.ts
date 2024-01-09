import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrimeIcons } from 'primeng/api';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { isLightMode, themeLink } from '#core/constants';
import { PersistanceService } from '#core/services';

const imports = [ToggleButtonModule, FormsModule];

@Component({
  selector: 'org-theme-button',
  template: `
    <p-toggleButton [onIcon]="PrimeIcons.SUN" [offIcon]="PrimeIcons.MOON" [(ngModel)]="isLightMode" (onChange)="toggleTheme()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class ThemeButtonComponent {
  public constructor(private readonly persistanceService: PersistanceService) {
    this.#themeLink = inject(DOCUMENT).getElementById(themeLink) as HTMLLinkElement;
  }

  readonly #themeLink: HTMLLinkElement;

  isLightMode: boolean = !!this.persistanceService.get(isLightMode);
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  public toggleTheme(): void {
    this.#themeLink.href = this.isLightMode ? 'light-theme.css' : 'dark-theme.css';
    this.persistanceService.set(isLightMode, this.isLightMode);
  }
}
