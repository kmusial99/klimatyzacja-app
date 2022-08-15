import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnobModule } from 'primeng/knob';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { GraphComponent } from '../graph/graph.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [HomeComponent, GraphComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    KnobModule,
    SelectButtonModule,
    CheckboxModule,
    InputSwitchModule,
    ButtonModule,
    ToggleButtonModule,
    InputTextModule,
    MessagesModule,
    ChartModule
  ]
})
export class HomeModule {
}
