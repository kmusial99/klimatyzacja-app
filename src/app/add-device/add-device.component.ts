import { Component, OnInit } from '@angular/core';
import { Urzadzenie } from '../models/urzadzenie';
import { UrzadzenieService } from '../service/urzadzenieService';
import { Message } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {

  public isLoading = false;
  public availableDevices: Urzadzenie[] = [];
  public messages: Message[];
  public selectedUrzadzenie: Urzadzenie;
  public displayDialog: boolean;
  public newName: string;
  form: FormGroup;

  constructor(private urzadzenieService: UrzadzenieService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  public onClick(): void {
    this.isLoading = true;
    this.availableDevices = [];
    this.selectedUrzadzenie = null;
    setTimeout(() => {
      this.searchingNewDevices();
      if (this.urzadzenieService.getAvailableDevices()?.length === 0) {
        this.showNotFoundMessage();
      }
    }, 1000);
  }

  public addDevice(): void {
    this.selectedUrzadzenie.nazwa = this.newName;
    this.urzadzenieService.addUrzadzenie(this.selectedUrzadzenie);
    this.searchingNewDevices();
    this.displayDialog = false;
    this.showSuccessMessage();
    this.selectedUrzadzenie = null;
    this.newName = null;
  }

  public showSuccessMessage(): void {
    this.messages = [
      { severity: 'success', summary: 'Dodano urządzenie' }
    ];
  }

  public showNotFoundMessage(): void {
    this.messages = [
      { severity: 'info', summary: 'Nie wykryto urządzeń' }
    ];
  }

  private searchingNewDevices(): void {
    this.availableDevices = this.urzadzenieService.getAvailableDevices();
    this.isLoading = false;
  }
}
