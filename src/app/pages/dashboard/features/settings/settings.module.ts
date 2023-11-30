import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { LayoutModule } from '#layout/.';
import { SettingsViewComponent, SettingsRoutingModule } from '#settings/.';
import {
  AccountSettingsComponent,
  AccountSettingsFormComponent,
  ThemeTogglerComponent,
  LanguageTogglerComponent,
} from '#settings/components';
import { ContainerComponent } from '#shared/components';

const declarations = [SettingsViewComponent, ThemeTogglerComponent, AccountSettingsComponent, AccountSettingsFormComponent];
const imports = [
  CommonModule,
  SettingsRoutingModule,
  ToggleButtonModule,
  FormsModule,
  ContainerComponent,
  LayoutModule,
  DynamicDialogModule,
  ButtonModule,
  ReactiveFormsModule,
  InputTextModule,
  InputNumberModule,
  LanguageTogglerComponent,
  TranslateModule,
];

@NgModule({ declarations, imports })
export default class SettingsModule {}
