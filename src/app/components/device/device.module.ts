import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnobModule } from 'primeng/knob';


import { SharedModule } from '../../shared/shared.module';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceComponent } from './device.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SliderModule } from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [DeviceComponent],
  imports: [
    CommonModule,
    SharedModule,
    DeviceRoutingModule,
    KnobModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    ToggleButtonModule,
    SliderModule,
    CalendarModule,
    MessagesModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService],
})
export class DeviceModule {
}
