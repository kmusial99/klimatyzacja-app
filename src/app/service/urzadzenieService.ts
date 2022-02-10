import { Urzadzenie } from '../models/urzadzenie';

export class UrzadzenieService {
  private newDate: Date = new Date();

  private urzadzenia = [
    new Urzadzenie(0, 'Sypialnia', 'Klimatyzator M', false, 20, 20, false, new Date()),
    new Urzadzenie(1, 'Sypialnia 2', 'Klimatyzator K', true, 23, 23, false, new Date()),
    new Urzadzenie(2, 'Salon', 'Klimatyzator L', false, 15, 15, true, this.newDate)
  ];

  private availableDevices = [
    new Urzadzenie(0, 'Klimatyzator C', 'Klimatyzator C', false, null, null, false, new Date()),
    new Urzadzenie(1, 'Klimatyzator A', 'Klimatyzator A', true, null, null, false, new Date())
  ];

  constructor() {
    this.newDate.setHours(this.newDate.getHours() + 1);
  }

  public getUrzadzenia(): Urzadzenie[] {
    return this.urzadzenia;
  }

  public getAvailableDevices(): Urzadzenie[] {
    return this.availableDevices;
  }

  public updateUrzadzenie(newDevice: Urzadzenie): void {
    this.urzadzenia = this.urzadzenia.map(oldDevice => {
      if (oldDevice.id === newDevice.id) {
        return newDevice;
      }
      return oldDevice;
    });
  }

  public addUrzadzenie(urzadzenie: Urzadzenie): void {
    this.availableDevices = this.availableDevices.filter(value => value.id !== urzadzenie.id);
    urzadzenie.id = this.urzadzenia.length > 0 ? (this.urzadzenia[this.urzadzenia.length - 1].id + 1) : 0;
    urzadzenie.czyWlaczone = false;
    urzadzenie.czyZaplanowaneWlaczenie = false;
    urzadzenie.dataPlanowanegoWlaczenia = new Date();
    urzadzenie.zadanaTemperatura = 0;
    this.urzadzenia.push(urzadzenie);
  }

  public deleteDevice(urzadzenie: Urzadzenie): void {
    this.urzadzenia = this.urzadzenia.filter(device => device.id !== urzadzenie.id);
    this.addOldDeviceToAvaibleDevices(urzadzenie);
  }

  public addOldDeviceToAvaibleDevices(urzadzenie: Urzadzenie): void {
    urzadzenie.id = this.availableDevices.length > 0 ? (this.availableDevices[this.availableDevices.length - 1].id + 1) : 0;
    urzadzenie.nazwa = urzadzenie.nazwaSeryjna;
    urzadzenie.czyWlaczone = false;
    urzadzenie.czyZaplanowaneWlaczenie = false;
    urzadzenie.dataPlanowanegoWlaczenia = new Date();
    urzadzenie.zadanaTemperatura = 0;
    this.availableDevices.push(urzadzenie);
  }
}
