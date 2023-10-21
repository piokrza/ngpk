import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { ContainerComponent } from '#shared/components';
import { LayoutComponent } from '#shared/ui/layout';
import {
  NavigationPanelsComponent,
  NavigationSidebarComponent,
  UserInfoComponent,
} from '#shared/ui/navigation/components';

const declarations: Array<any> = [
  NavigationPanelsComponent,
  NavigationSidebarComponent,
  UserInfoComponent,
  LayoutComponent,
];

const imports: Array<any> = [
  CommonModule,
  ButtonModule,
  TieredMenuModule,
  ContainerComponent,
  ToggleButtonModule,
  FormsModule,
  ProgressSpinnerModule,
  ToastModule,
  ConfirmDialogModule,
];

const exports: Array<any> = [LayoutComponent];

@NgModule({ declarations, imports, exports })
export class UiModule {}
