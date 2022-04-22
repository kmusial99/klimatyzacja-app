import { Urzadzenie } from '../models/urzadzenie';

export class UrzadzenieService {
  private newDate: Date = new Date();

  private urzadzenia = [
    new Urzadzenie(0, 'Sypialnia', 'Klimatyzator M', false, 20, 5, false, new Date()),
    new Urzadzenie(1, 'Sypialnia 2', 'Klimatyzator K', true, 5, 23, false, new Date()),
    new Urzadzenie(2, 'Salon', 'Klimatyzator L', false, 15, 1, true, this.newDate)
  ];

  private availableDevices = [
    new Urzadzenie(0, 'Klimatyzator C', 'Klimatyzator C', false, 20, 20, false, new Date()),
    new Urzadzenie(1, 'Klimatyzator A', 'Klimatyzator A', true, 20, 20, false, new Date())
  ];

  private deviceToPopup = null;

  constructor() {
    this.newDate.setHours(this.newDate.getHours() + 1);
  }

  public getUrzadzenia(): Urzadzenie[] {
    return this.urzadzenia;
  }

  public getDeviceToPopup(): Urzadzenie {
    return this.deviceToPopup;
  }

  public setDeviceToPopup(urzadzenie: Urzadzenie): void {
    this.deviceToPopup = urzadzenie;
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

  public updateTemp(deviceId: number, zmiana: number): void {
    this.urzadzenia = this.urzadzenia.map(oldDevice => {
      if (oldDevice.id === deviceId) {
        oldDevice.aktualnaTemperatura = oldDevice.aktualnaTemperatura + zmiana;
        return oldDevice;
      }
      return oldDevice;
    });
  }

  public isDeviceDeleted(urzadzenie: Urzadzenie): boolean {
    return this.urzadzenia.filter(value => value.id === urzadzenie.id).length === 0;
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
