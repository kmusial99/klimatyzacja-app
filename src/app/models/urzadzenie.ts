export class Urzadzenie {
  id: number;
  nazwa: string;
  nazwaSeryjna: string;
  czyWlaczone: boolean;
  zadanaTemperatura: number;
  aktualnaTemperatura: number;
  czyZaplanowaneWlaczenie: boolean;
  dataPlanowanegoWlaczenia: Date;

  constructor(
    id: number,
    nazwa: string,
    nazwaSeryjna: string,
    wlaczone: boolean,
    zadanaTemperatura: number,
    aktualnaTemperatura: number,
    czyZaplanowaneWlaczenie: boolean,
    dataPlanowanegoWlaczenia: Date
  ) {
    this.id = id;
    this.nazwa = nazwa;
    this.nazwaSeryjna = nazwaSeryjna;
    this.czyWlaczone = wlaczone;
    this.zadanaTemperatura = zadanaTemperatura;
    this.aktualnaTemperatura = aktualnaTemperatura;
    this.czyZaplanowaneWlaczenie = czyZaplanowaneWlaczenie;
    this.dataPlanowanegoWlaczenia = dataPlanowanegoWlaczenia;
  }
}
