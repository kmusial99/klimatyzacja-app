import { Component, OnInit } from '@angular/core';
import { Urzadzenie } from '../../models/urzadzenie';
import { UrzadzenieService } from '../../service/urzadzenie.service';
import { Message } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html'
})
export class AddDeviceComponent implements OnInit {

  public availableDevices: Urzadzenie[] = [];
  public messages: Message[];
  public selectedUrzadzenie: Urzadzenie;
  public displayDialog: boolean;
  public form: FormGroup;

  get name(): any {
    return this.form.get('name').value;
  }

  constructor(private urzadzenieService: UrzadzenieService) {
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  public onClick(): void {
    this.availableDevices = [];
    this.selectedUrzadzenie = null;
    this.refreshRecords();
    if (this.availableDevices?.length === 0) {
      this.showNotFoundMessage();
    }
  }

  public addDevice(): void {
    this.selectedUrzadzenie.nazwa = this.name;
    this.urzadzenieService.addUrzadzenie(this.selectedUrzadzenie);
    this.displayDialog = false;
    this.showSuccessMessage();
    this.selectedUrzadzenie = null;
    this.refreshRecords();
    this.form.reset();
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

  public refreshRecords(): void {
    this.availableDevices = this.urzadzenieService.getAvailableDevices();
  }
}
