import { Component, OnDestroy, OnInit } from '@angular/core';
import { Urzadzenie } from '../../models/urzadzenie';
import { Router } from '@angular/router';
import { UrzadzenieService } from '../../service/urzadzenie.service';
import { interval, Subscription } from 'rxjs';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [MessageService]
})
export class HomeComponent implements OnDestroy, OnInit {

  public urzadzenia: Urzadzenie[];
  public messages: Message[];
  private subscription: Subscription;

  constructor(private router: Router,
              private urzadzenieService: UrzadzenieService) {
    this.urzadzenia = this.urzadzenieService.getDevices();
    const source = interval(1000);
    this.subscription = source.subscribe(() => {
      const time = new Date();
      this.urzadzenia.forEach(value => {
        if (value.czyZaplanowaneWlaczenie && value.dataPlanowanegoWlaczenia <= time) {
          value.czyWlaczone = true;
          value.czyZaplanowaneWlaczenie = false;
        }
      });
    });
  }

  public ngOnInit(): void {
    const urzadzeniePopup = this.urzadzenieService.getDeviceToPopup();
    if (urzadzeniePopup !== null) {
      this.showMessagesForDevice(urzadzeniePopup);
    }
    this.urzadzenieService.setDeviceToPopup(null);

  }

  public onDeviceChange(urzadzenie: Urzadzenie): void {
    if (urzadzenie.czyWlaczone) {
      urzadzenie.czyZaplanowaneWlaczenie = false;
      urzadzenie.dataPlanowanegoWlaczenia = new Date();
    }
  }

  public showMessagesForDevice(urzadzeniePopup: Urzadzenie): void {
    if(this.urzadzenieService.isDeviceDeleted(urzadzeniePopup)) {
      this.showDeleteMessage(urzadzeniePopup);
    } else {
      this.showTurnOnMessage(urzadzeniePopup);
      this.showDateMessage(urzadzeniePopup);
    }
  }

  public showTurnOnMessage(urzadzenie: Urzadzenie): void {
    if (urzadzenie.czyWlaczone) {
      this.messages = [
        { severity: 'success', summary: `Uruchomiono klimatyzator  ${urzadzenie.nazwa}` }
      ];
    }
  }

  public showDeleteMessage(urzadzenie: Urzadzenie): void {
      this.messages = [
        { severity: 'success', summary: `Usunięto urządzenie ${urzadzenie.nazwa}`}];
  }

  public showDateMessage(urzadzenie: Urzadzenie): void {
    if (urzadzenie.czyZaplanowaneWlaczenie) {
      const year = new Intl.DateTimeFormat('pl', { year: 'numeric' }).format(urzadzenie.dataPlanowanegoWlaczenia);
      const month = new Intl.DateTimeFormat('pl', { month: '2-digit' }).format(urzadzenie.dataPlanowanegoWlaczenia);
      const day = new Intl.DateTimeFormat('pl', { day: '2-digit' }).format(urzadzenie.dataPlanowanegoWlaczenia);
      const hour = new Intl.DateTimeFormat('pl', { hour: '2-digit' }).format(urzadzenie.dataPlanowanegoWlaczenia);
      const minute = new Intl.DateTimeFormat('pl', { minute: '2-digit' }).format(urzadzenie.dataPlanowanegoWlaczenia);
      const formattedDate = `${day}.${month}.${year} o godzinie ${hour}:${minute}`;
      this.messages = [
        { severity: 'success', summary: `Klimatyzator uruchomi się ${formattedDate}` }
      ];
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
