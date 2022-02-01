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

  urzadzenia: Urzadzenie[];
  subscription: Subscription;

  constructor(private router: Router,
              private urzadzenieService: UrzadzenieService) {
    this.urzadzenia = this.urzadzenieService.getUrzadzenia();
    const source = interval(1000);
    this.subscription = source.subscribe(val => {
      const time = new Date();
      this.urzadzenia.forEach(value => {
        if (value.czyZaplanowaneWlaczenie && value.dataPlanowanegoWlaczenia <= time) {
          value.wlaczone = true;
          value.czyZaplanowaneWlaczenie = false;
        }
      });
    });
  }

  onDeviceChange(urzadzenie: Urzadzenie) {
    if (urzadzenie.wlaczone) {
      urzadzenie.czyZaplanowaneWlaczenie = false;
      urzadzenie.dataPlanowanegoWlaczenia = new Date();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
