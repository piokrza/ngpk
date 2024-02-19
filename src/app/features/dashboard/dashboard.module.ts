import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { DashboardRoutingModule, DashboardComponent } from '#dashboard/index';
import { ContainerComponent } from '#shared/components';

const declarations = [DashboardComponent];
const imports = [CommonModule, DashboardRoutingModule, ChartModule, CardModule, ProgressSpinnerModule, ContainerComponent];

@NgModule({ declarations, imports })
export class DashboardModule {}
