import { Urzadzenie } from '../models/urzadzenie';

export class UrzadzenieService {
  private newDate: Date = new Date();

  private urzadzenia = [
    new Urzadzenie(0, 'Sypialnia', false, 20, false, new Date()),
    new Urzadzenie(1, 'Sypialnia 2', true, 23, false, new Date()),
    new Urzadzenie(2, 'Salon', false, 15, true, this.newDate)
  ];

  private availableDevices = [
    new Urzadzenie(0, 'Klimatyzator 1230', false, 20, false, new Date()),
    new Urzadzenie(1, 'Klimatyzator 2000', true, null, false, new Date())
  ];

  constructor() {
    this.newDate.setHours(this.newDate.getHours() + 1);
  }

  public getUrzadzenia() {
    return this.urzadzenia;
  }

  public getAvailableDevices(): Urzadzenie[] {
    return this.availableDevices;
  }

  // public getUrzadzenie(id: number): Urzadzenie {
  //   return this.urzadzenia.find(device => {
  //     if (device.id === id) {
  //       return device;
  //     }
  //   });
  // }

  public updateUrzadzenie(newDevice: Urzadzenie) {
    this.urzadzenia = this.urzadzenia.map(oldDevice => {
      if (oldDevice.id === newDevice.id) {
        return newDevice;
      }
      return oldDevice;
    });
  }

  public addUrzadzenie(urzadzenie: Urzadzenie) {
    this.availableDevices = this.availableDevices.filter(value => value.id !== urzadzenie.id);
    urzadzenie.id = this.urzadzenia[this.urzadzenia.length - 1].id + 1;
    urzadzenie.wlaczone = false;
    urzadzenie.czyZaplanowaneWlaczenie = false;
    urzadzenie.dataPlanowanegoWlaczenia = new Date();
    urzadzenie.temperatura = 0;
    this.urzadzenia.push(urzadzenie);
  }

  deleteDevice(idDeviceToDelete: number) {
    this.urzadzenia = this.urzadzenia.filter(urzadzenie => urzadzenie.id !== idDeviceToDelete);
  }
}
