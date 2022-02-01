import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './components/home/home-routing.module';
import { DeviceRoutingModule } from './components/device/device-routing.module';
import { AddDeviceModule } from './components/add-device/add-device.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    AddDeviceModule,
    DeviceRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
