export class Urzadzenie {
  id: number;
  nazwa: string;
  wlaczone: boolean;
  temperatura: number;
  czyZaplanowaneWlaczenie: boolean;
  dataPlanowanegoWlaczenia: Date;

  constructor(
    id: number,
    nazwa: string,
    wlaczone: boolean,
    temperatura: number,
    czyZaplanowaneWlaczenie: boolean,
    dataPlanowanegoWlaczenia: Date
  ) {
    this.id = id;
    this.nazwa = nazwa;
    this.wlaczone = wlaczone;
    this.temperatura = temperatura;
    this.czyZaplanowaneWlaczenie = czyZaplanowaneWlaczenie;
    this.dataPlanowanegoWlaczenia = dataPlanowanegoWlaczenia;
  }
}
