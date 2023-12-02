import { ChangeDetectionStrategy, Component, Input, WritableSignal, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { FADE_IN } from '#common/constants';

@Component({
  selector: 'ctrl-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [FADE_IN],
})
export class MobileMenuComponent {
  @Input() menuItems!: MenuItem[];

  public isOpen: WritableSignal<boolean> = signal(false);

  public toggle(): void {
    this.isOpen.set(!this.isOpen());
  }

  public itemClick(command?: any): void {
    command && command();
    this.isOpen.set(false);
  }
}
