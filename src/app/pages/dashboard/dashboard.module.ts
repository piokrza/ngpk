import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { MetamaskService, Web3State } from '#features/web3/data-access';
import { DashboardFacade, DashboardRoutingModule, DashboardViewComponent } from '#pages/dashboard';
import { ContainerComponent } from '#shared/components';
import { UiModule } from '#shared/ui';

const declarations = [DashboardViewComponent];
const imports = [
  CommonModule,
  DashboardRoutingModule,
  ChartModule,
  UiModule,
  CardModule,
  ProgressSpinnerModule,
  ContainerComponent,
  UiModule,
];
const providers: Provider[] = [Web3State, MetamaskService, DashboardFacade];

@NgModule({ declarations, imports, providers })
export default class DashboardModule {}
