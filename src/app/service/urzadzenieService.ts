import { Urzadzenie } from '../models/urzadzenie';

export class UrzadzenieService {
  private urzadzenia = [
    new Urzadzenie(1, 'Sypialnia', false, 20),
    new Urzadzenie(2, 'Sypialnia 2', true, 23),
    new Urzadzenie(3, 'Salon', true, 15)
  ];

  public getUrzadzenia() {
    return this.urzadzenia;
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
    this.urzadzenia.push(urzadzenie);
  }
}
