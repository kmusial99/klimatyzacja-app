export class Urzadzenie {
  id: number;
  nazwa: string;
  wlaczone: boolean;
  temperatura: number;

  constructor(id: number, nazwa: string, wlaczone: boolean, temperatura: number) {
    this.id = id;
    this.nazwa = nazwa;
    this.wlaczone = wlaczone;
    this.temperatura = temperatura;
  }
}
