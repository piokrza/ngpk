import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

import { AuthSelectors } from '#auth/store';
import { connectState } from '#core/utils';
import { ContainerComponent } from '#shared/components';

const imports = [SidebarModule, ButtonModule, FormsModule, ContainerComponent];

@Component({
  selector: 'org-panel',
  templateUrl: './panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class PanelComponent {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  readonly state = connectState(this.destroyRef, {
    user: this.store.select(AuthSelectors.user),
  });

  sidebarVisible = false;
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
}
