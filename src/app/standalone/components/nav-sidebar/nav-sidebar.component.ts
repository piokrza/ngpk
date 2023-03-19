import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from '@standalone/components/container/container.component';
import { UserInfoComponent } from '@standalone/components/user-info/user-info.component';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';

const NavSidebarImports = [
  CommonModule,
  ContainerComponent,
  RouterModule,
  UserInfoComponent,
  ToggleButtonModule,
  FormsModule,
  ButtonModule,
];

@Component({
  selector: 'ctrl-nav-sidebar',
  standalone: true,
  imports: NavSidebarImports,
  templateUrl: './nav-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavSidebarComponent {
  @Input() public menuLinks!: MenuItem[];
  @Input() public isLightMode!: boolean;

  @Output() public toggleThemeMode: EventEmitter<boolean> = new EventEmitter<boolean>(this.isLightMode);
}
