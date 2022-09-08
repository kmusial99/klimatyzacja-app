import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { Urzadzenie } from '../models/urzadzenie';
import { UrzadzenieService } from './urzadzenie.service';

@Injectable({
  providedIn: 'root'
})
export class KlimatyzatorService {
  kp = 0.4;
  Ti = 10
  dt = 0.2;
  ki = (this.kp * this.dt) / this.Ti;
  cumulativError = 0;
  private devices: Urzadzenie[];

  constructor(private urzadzenieService: UrzadzenieService) {
    const source = interval(5000);
    source.subscribe(() => {
      this.changeRoomTemperature();
    });
  }

  private changeRoomTemperature(): void {
    this.devices = this.urzadzenieService.getDevices();
    this.devices.forEach(urzadzenie => {
      if (urzadzenie.czyWlaczone) {
        const desiredTemp = urzadzenie.zadanaTemperatura;
        const currentTemp = urzadzenie.aktualnaTemperatura;
        const regulation = this.calculateCotrnolSignal(desiredTemp, currentTemp, this.dt);
        this.urzadzenieService.updateTemp(urzadzenie.id, regulation);
      }
    });
  }

  private calculateCotrnolSignal(targetValue: number, currentValue: number, dt: number): number {
    var currentError = targetValue - currentValue;
    var P_correction = this.kp * currentError;
    this.cumulativError += currentError * dt;
    var I_correction = this.ki * this.cumulativError;
    return P_correction + I_correction;
  }

}
