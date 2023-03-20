import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavSidebarComponent } from '@features/ui/components/nav-sidebar/nav-sidebar.component';
import { NavigationComponent } from '@features/ui/components/navigation/navigation.component';
import { UserInfoComponent } from '@features/ui/components/user-info/user-info.component';
import { ContainerComponent } from '@standalone/components/container/container.component';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToggleButtonModule } from 'primeng/togglebutton';

const declarations: Array<any> = [NavigationComponent, NavSidebarComponent, UserInfoComponent];

const imports: Array<any> = [
  CommonModule,
  ButtonModule,
  TieredMenuModule,
  ContainerComponent,
  ToggleButtonModule,
  FormsModule,
];

const exports: Array<any> = [...declarations];

@NgModule({ declarations, imports, exports })
export class UiModule {}
