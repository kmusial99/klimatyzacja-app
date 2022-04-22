import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { Urzadzenie } from '../models/urzadzenie';
import { UrzadzenieService } from './urzadzenie.service';

@Injectable({
  providedIn: 'root'
})
export class KlimatyzatorService {
  private error = 0;
  private previousError = 0;
  private pout = 0;
  private iout = 0;
  private output = 0;
  private kp = 0.9;
  private ki = 0.0;
  private integral = 0;


  private wzmocnienieP = 0.50;
  private kiIr = 15.20;
  private ts = 0.00025;
  private uchyb = 0.0;
  private duIrD = 0.0;
  private poprzedniUchyb = 0.0;
  private inSatIrD = 0.0;
  private outSatIrD = 0.0;
  private uIrDP = 0.0;

  private urzadzenia: Urzadzenie[];

  constructor(private urzadzenieService: UrzadzenieService) {
    this.changeRoomTemperature();
  }

  public changeRoomTemperature(): void {
    this.urzadzenia = this.urzadzenieService.getUrzadzenia();
    const source = interval(1000);
    source.subscribe(() => {
      this.urzadzenia.forEach(urzadzenie => {
        const tempZadana = urzadzenie.zadanaTemperatura;
        const tempAktualna = urzadzenie.aktualnaTemperatura;
        const zmianaTemperatury = this.calculate(tempZadana, tempAktualna);
        this.urzadzenieService.updateTemp(urzadzenie.id, zmianaTemperatury);
      });
    });
  }

  public calculate(tempZadana: number, tempObecna: number): number {
    this.uchyb = tempZadana - tempObecna;
    this.pout = this.kp * this.uchyb;
    this.integral += this.uchyb - this.poprzedniUchyb;
    this.iout = this.ki * this.integral;
    this.poprzedniUchyb = this.uchyb;
    this.output = this.pout + this.iout;

    this.output = Math.round(this.output);
    return this.output;
  }


  public calculateDziala(tempZadana: number, tempObecna: number): number {
    this.uchyb = tempZadana - tempObecna;
    this.duIrD = this.uchyb * (this.wzmocnienieP + this.ts * this.kiIr) - this.poprzedniUchyb * this.wzmocnienieP;
    this.poprzedniUchyb = this.uchyb;
    this.inSatIrD = this.duIrD + this.uIrDP;

    if (this.inSatIrD > 2000.0) {
      this.outSatIrD = 2000.0;
    } else if (this.inSatIrD < -2000.0) {
      this.outSatIrD = -2000.0;
    } else {
      this.outSatIrD = this.inSatIrD;
    }

    this.uIrDP = this.outSatIrD;

    return this.outSatIrD;
  }


  public calculate2(tempZadana: number, tempObecna: number): number {
    this.uchyb = tempZadana - tempObecna;
    this.duIrD = this.uchyb * (this.wzmocnienieP + this.ts * this.kiIr) - this.poprzedniUchyb * this.wzmocnienieP;
    this.poprzedniUchyb = this.uchyb;
    this.inSatIrD = this.duIrD + this.uIrDP;

    if (this.inSatIrD > 2000.0) {
      this.outSatIrD = 2000.0;
    } else if (this.inSatIrD < -2000.0) {
      this.outSatIrD = -2000.0;
    } else {
      this.outSatIrD = this.inSatIrD;
    }

    this.uIrDP = this.outSatIrD;

    return this.outSatIrD;
  }

}
