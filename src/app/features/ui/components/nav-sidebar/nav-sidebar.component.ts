import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ctrl-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavSidebarComponent {
  @Input() public menuLinks!: MenuItem[];
}
