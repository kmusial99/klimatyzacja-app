import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddDeviceComponent } from './add-device.component';

const routes: Routes = [
  {
    path: 'add-device',
    component: AddDeviceComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddDeviceRoutingModule {}
