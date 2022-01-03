import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KnobModule} from 'primeng/knob';


import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule, KnobModule]
})
export class DashboardModule {}
