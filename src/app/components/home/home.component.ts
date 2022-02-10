import { Component, OnDestroy } from '@angular/core';
import { Urzadzenie } from '../../models/urzadzenie';
import { Router } from '@angular/router';
import { UrzadzenieService } from '../../service/urzadzenieService';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  public urzadzenia: Urzadzenie[];
  private subscription: Subscription;

  constructor(private router: Router,
              private urzadzenieService: UrzadzenieService) {
    this.urzadzenia = this.urzadzenieService.getUrzadzenia();
    const source = interval(1000);
    this.subscription = source.subscribe(val => {
      const time = new Date();
      this.urzadzenia.forEach(value => {
        if (value.czyZaplanowaneWlaczenie && value.dataPlanowanegoWlaczenia <= time) {
          value.czyWlaczone = true;
          value.czyZaplanowaneWlaczenie = false;
        }
      });
    });
  }

  public onDeviceChange(urzadzenie: Urzadzenie): void {
    if (urzadzenie.czyWlaczone) {
      urzadzenie.czyZaplanowaneWlaczenie = false;
      urzadzenie.dataPlanowanegoWlaczenia = new Date();
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
