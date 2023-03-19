import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from '@dashboard/dashboard-routing.module';
import { DashboardViewComponent } from '@dashboard/dashboard-view/dashboard-view.component';

@NgModule({
  declarations: [DashboardViewComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
