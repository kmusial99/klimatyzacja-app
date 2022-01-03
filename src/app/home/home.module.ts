import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KnobModule} from 'primeng/knob';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, KnobModule]
})
export class HomeModule {}
