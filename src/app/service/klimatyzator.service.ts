import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { Urzadzenie } from '../models/urzadzenie';
import { UrzadzenieService } from './urzadzenie.service';

@Injectable({
  providedIn: 'root'
})
export class KlimatyzatorService {
  kp = 0.716;
  Ti = 0.873;
  ki = (this.kp * 0.01) / this.Ti;
  cumulativError = 0;
  maxCorrection = 0.5;
  minCorrection = -0.5;
  private urzadzenia: Urzadzenie[];

  constructor(private urzadzenieService: UrzadzenieService) {
    const source = interval(2000);
    source.subscribe(() => {
      this.changeRoomTemperature();
    });
  }

  private changeRoomTemperature(): void {
    this.urzadzenia = this.urzadzenieService.getDevices();
    this.urzadzenia.forEach(urzadzenie => {
      if (urzadzenie.czyWlaczone) {
        const tempZadana = urzadzenie.zadanaTemperatura;
        const tempAktualna = urzadzenie.aktualnaTemperatura;
        const correction = this.calculateTemperature(tempZadana, tempAktualna, 0.01);
        this.urzadzenieService.updateTemp(urzadzenie.id, correction);
      }
    });
  }

  private calculateTemperature(targetValue: number, currentValue: number, dt: number): number {
    var currentError = targetValue - currentValue;
    var P_correction = this.kp * currentError;
    this.cumulativError += Math.max(Math.min(currentError * dt, 1), -1);
    var I_correction = this.ki * this.cumulativError;
    var correction = P_correction + I_correction;

    if (correction > this.maxCorrection) {
      correction = this.maxCorrection;
    }
    if (correction < this.minCorrection) {
      correction = this.minCorrection;
    }
    return correction;
  }


}
