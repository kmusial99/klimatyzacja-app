import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { AddDeviceComponent } from './add-device.component';
import { AddDeviceRoutingModule } from './add-device-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [AddDeviceComponent],
    imports: [
        CommonModule,
        SharedModule,
        AddDeviceRoutingModule,
        ButtonModule,
        InputTextModule,
        ProgressSpinnerModule,
        TableModule,
        ScrollingModule,
        DialogModule,
        MessagesModule,
        ReactiveFormsModule,
        FormsModule,
        RippleModule
    ]
})
export class AddDeviceModule {
}
