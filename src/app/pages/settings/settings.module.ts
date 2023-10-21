import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '#features/ui/ui.module';
import { SettingsViewComponent, SettingsRoutingModule } from '#pages/settings';
import {
  AccountSettingsComponent,
  AccountSettingsFormComponent,
  ThemeTogglerComponent,
} from '#pages/settings/components';
import { ContainerComponent } from '#shared/components';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';

const declarations: Array<any> = [
  SettingsViewComponent,
  ThemeTogglerComponent,
  AccountSettingsComponent,
  AccountSettingsFormComponent,
];
const imports: Array<any> = [
  CommonModule,
  SettingsRoutingModule,
  ToggleButtonModule,
  FormsModule,
  ContainerComponent,
  UiModule,
  DynamicDialogModule,
  ButtonModule,
  ReactiveFormsModule,
  InputTextModule,
  InputNumberModule,
];

@NgModule({ declarations, imports })
export class SettingsModule {}
