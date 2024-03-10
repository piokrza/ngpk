import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { map } from 'rxjs';

import { themeLink } from '@ngpk/core/constant';
import { connectState } from '@ngpk/core/util';

import { AppConfig, ThemeType } from '#config/models';
import { ConfigActions, ConfigSelectors } from '#config/store';

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

    const config: AppConfig = {
      ...this.state.config!,
      theme: this.state.config?.theme === 'light' ? 'dark' : 'light',
    };

    this.store.dispatch(ConfigActions.updateConfig({ config }));
  }
}
