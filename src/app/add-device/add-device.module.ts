import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDeviceRoutingModule } from './add-device-routing.module';

import { AddDeviceComponent } from './add-device.component';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AddDeviceComponent],
  imports: [CommonModule, SharedModule, AddDeviceRoutingModule, ButtonModule]
})
export class AddDeviceModule {}
