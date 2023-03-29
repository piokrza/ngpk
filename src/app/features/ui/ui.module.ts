import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '@features/ui/navigation/components/navigation/navigation.component';
import { NavigationPanelsComponent } from '@features/ui/navigation/components/navigation-panels/navigation-panels.component';
import { UserInfoComponent } from '@features/ui/navigation/components/user-info/user-info.component';
import { ContainerComponent } from '@standalone/components/container/container.component';
import { NavigationSidebarComponent } from '@features/ui/navigation/components/navigation-sidebar/navigation-sidebar.component';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const declarations: Array<any> = [
  NavigationPanelsComponent,
  NavigationSidebarComponent,
  UserInfoComponent,
  NavigationComponent,
];

const imports: Array<any> = [
  CommonModule,
  ButtonModule,
  TieredMenuModule,
  ContainerComponent,
  ToggleButtonModule,
  FormsModule,
  ProgressSpinnerModule,
];

const exports: Array<any> = [NavigationComponent];

@NgModule({ declarations, imports, exports })
export class UiModule {}
