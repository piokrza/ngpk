import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  AccountSettingsComponent,
  AccountSettingsFormComponent,
  LanguageTogglerComponent,
  PanelComponent,
  ThemeTogglerComponent,
} from '@ngpk/organizer/component/settings';
import { SettingsRoutingModule } from '@ngpk/organizer/feature/settings';
import { ContainerComponent } from '@ngpk/shared-ui/components';

const imports = [
  CommonModule,
  PanelComponent,
  ContainerComponent,
  ThemeTogglerComponent,
  SettingsRoutingModule,
  AccountSettingsComponent,
  LanguageTogglerComponent,
  AccountSettingsFormComponent,
];

@NgModule({ imports })
export class SettingsModule {}
