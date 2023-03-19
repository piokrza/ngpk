import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ContainerComponent } from '@standalone/components/container/container.component';
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from '@standalone/components/user-info/user-info.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

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
