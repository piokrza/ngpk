import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { SettingsRoutingModule } from '@ngpk/settings-organizer/feature';
import {
  AccountSettingsComponent,
  AccountSettingsFormComponent,
  LanguageTogglerComponent,
  PanelComponent,
  ThemeTogglerComponent,
} from '@ngpk/settings-organizer/shared';
import { ContainerComponent } from '@ngpk/shared-ui/shared';

const declarations = [ThemeTogglerComponent, AccountSettingsComponent, AccountSettingsFormComponent, PanelComponent];
const imports = [
  CommonModule,
  SettingsRoutingModule,
  FormsModule,
  ContainerComponent,
  DynamicDialogModule,
  ButtonModule,
  ReactiveFormsModule,
  InputTextModule,
  InputNumberModule,
  LanguageTogglerComponent,
  TranslateModule,
  ToggleButtonModule,
];

@NgModule({ declarations, imports })
export class SettingsModule {}
