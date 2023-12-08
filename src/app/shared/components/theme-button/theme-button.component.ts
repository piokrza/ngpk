import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { isLightMode } from '#common/constants';
import { PersistanceService } from '#common/services';

const imports = [ToggleButtonModule, FormsModule];

@Component({
  selector: 'ctrl-theme-button',
  template: `
    <p-toggleButton [onIcon]="PrimeIcons.SUN" [offIcon]="PrimeIcons.MOON" [(ngModel)]="isLightMode" (onChange)="toggleTheme()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class ThemeButtonComponent {
  public constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly persistanceService: PersistanceService
  ) {
    this.themeLink = this.document.getElementById('theme-link') as HTMLLinkElement;
  }

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  public isLightMode: boolean = !!inject(PersistanceService).get(isLightMode);

  private themeLink: HTMLLinkElement;

  public toggleTheme(): void {
    this.themeLink.href = this.isLightMode ? 'light-theme.css' : 'dark-theme.css';
    this.persistanceService.set(isLightMode, this.isLightMode);
  }
}
