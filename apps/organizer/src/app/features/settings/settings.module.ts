import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import { ContainerComponent, ThemeButtonComponent } from '@ngpk/shared-ui/shared';

import {
  AccountSettingsComponent,
  AccountSettingsFormComponent,
  LanguageTogglerComponent,
  PanelComponent,
  ThemeTogglerComponent,
} from '#settings/components';
import { SettingsRoutingModule } from '#settings/index';

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
  ThemeButtonComponent,
];

@NgModule({ declarations, imports })
export class SettingsModule {}
