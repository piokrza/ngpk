import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AppPaths } from '#common/enums';

@Component({
  selector: 'ctrl-auth',
  template: `
    <p-button [label]="'menu.web3' | translate" (onClick)="navigateToWeb3()" />
    <section class="section">
      <div class="w-full section__inner">
        <router-outlet />
      </div>
    </section>
  `,
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private readonly router: Router = inject(Router);

  public navigateToWeb3(): void {
    this.router.navigate([AppPaths.WEB3]);
  }
}
