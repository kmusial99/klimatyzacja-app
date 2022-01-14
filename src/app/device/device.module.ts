import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KnobModule} from 'primeng/knob';


import { SharedModule } from '../shared/shared.module';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceComponent } from './device.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  declarations: [DeviceComponent],
  imports: [CommonModule, SharedModule, DeviceRoutingModule, KnobModule, InputNumberModule, InputTextModule, ButtonModule, ToggleButtonModule]
})
export class DeviceModule {}
