import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ctrl-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavSidebarComponent {
  @Input() public menuLinks!: MenuItem[];
  @Input() public isLightMode!: boolean;

  @Output() public toggleThemeMode: EventEmitter<boolean> = new EventEmitter<boolean>(this.isLightMode);
}
