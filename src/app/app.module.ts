import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './components/home/home.module';

import { AppComponent } from './app.component';
import { DeviceModule } from './components/device/device.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { UrzadzenieService } from './service/urzadzenieService';
import { AddDeviceModule } from './components/add-device/add-device.module';
import { DialogModule } from 'primeng/dialog';
import { KlimatyzatorService } from './service/klimatyzator.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DeviceModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    SidebarModule,
    ButtonModule,
    AddDeviceModule,
    DialogModule
  ],
  providers: [UrzadzenieService, KlimatyzatorService],
  bootstrap: [AppComponent]
})
export class AppModule {}
