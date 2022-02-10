import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Urzadzenie } from '../../models/urzadzenie';
import { UrzadzenieService } from '../../service/urzadzenieService';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DeviceComponent implements OnInit, OnDestroy {

  public deviceToUpdate: Urzadzenie;
  public messages: Message[];
  public newDate = new Date();
  private urzadzenie: Urzadzenie;
  private id;
  private sub;

  constructor(private activatedroute: ActivatedRoute,
              private router: Router,
              private urzadzenieService: UrzadzenieService,
              private confirmationService: ConfirmationService) {
  }

  public ngOnInit(): void {
    this.sub = this.activatedroute.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'));
      const urzadzenia = this.urzadzenieService.getUrzadzenia();
      this.urzadzenie = urzadzenia.filter(order => (order.id === this.id))[0];
    });
    this.deviceToUpdate = new Urzadzenie(
      this.urzadzenie.id,
      this.urzadzenie.nazwa,
      this.urzadzenie.nazwaSeryjna,
      this.urzadzenie.czyWlaczone,
      this.urzadzenie.zadanaTemperatura,
      this.urzadzenie.aktualnaTemperatura,
      this.urzadzenie.czyZaplanowaneWlaczenie,
      null
    );
    this.deviceToUpdate.dataPlanowanegoWlaczenia =
      this.urzadzenie.czyZaplanowaneWlaczenie ? this.urzadzenie.dataPlanowanegoWlaczenia : this.newDate;
  }

  public ngOnDestroy(): void {
    this.dateInPast(this.deviceToUpdate.dataPlanowanegoWlaczenia);
    this.sub.unsubscribe();
  }

  public onBack(): void {
    this.router.navigate(['home']);
  }

  public save(): void {
    // if (this.deviceToUpdate.czyZaplanowaneWlaczenie) {
    //   this.setToEnableMessageShow();
    // }
    // if (this.deviceToUpdate.wlaczone) {
    //   this.turnOnMessageShow();
    // }
    this.deviceToUpdate.dataPlanowanegoWlaczenia.setSeconds(0);
    this.urzadzenieService.updateUrzadzenie(this.deviceToUpdate);
    this.router.navigate(['home']);
  }

  public setToEnableMessageShow(): void {
    if (this.deviceToUpdate.czyZaplanowaneWlaczenie) {
      const year = new Intl.DateTimeFormat('pl', { year: 'numeric' }).format(this.deviceToUpdate.dataPlanowanegoWlaczenia);
      const month = new Intl.DateTimeFormat('pl', { month: '2-digit' }).format(this.deviceToUpdate.dataPlanowanegoWlaczenia);
      const day = new Intl.DateTimeFormat('pl', { day: '2-digit' }).format(this.deviceToUpdate.dataPlanowanegoWlaczenia);
      const hour = new Intl.DateTimeFormat('pl', { hour: '2-digit' }).format(this.deviceToUpdate.dataPlanowanegoWlaczenia);
      const minute = new Intl.DateTimeFormat('pl', { minute: '2-digit' }).format(this.deviceToUpdate.dataPlanowanegoWlaczenia);
      const formattedDate = `${day}.${month}.${year} o godzinie ${hour}:${minute}`;
      this.messages = [
        { severity: 'success', summary: `Klimatyzator uruchomi się ${formattedDate}` }
      ];
    }
  }

  public turnOnMessageShow(): void {
    if (this.deviceToUpdate.czyWlaczone) {
      this.messages = [
        { severity: 'success', summary: 'Uruchomiono klimatyzator' }
      ];
    }
  }

  public dateInPast(ourDate: Date): void {
    if (this.deviceToUpdate.czyZaplanowaneWlaczenie === true) {
      if (ourDate <= new Date()) {
        this.urzadzenie.czyWlaczone = true;
        this.deviceToUpdate.czyWlaczone = true;
        this.urzadzenie.czyZaplanowaneWlaczenie = false;
        this.deviceToUpdate.czyZaplanowaneWlaczenie = false;
      }
    }
  }

  public delete(): void {
    this.confirmationService.confirm({
      acceptLabel: 'Usuń',
      rejectLabel: 'Anuluj',
      message: 'Jesteś pewny, że chcesz usunąć to urządzenie?',
      header: 'Usuwanie urządzenia',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messages = [{ severity: 'success', summary: 'Usunięto urządzenie' }];
        this.router.navigate(['home']);
        this.urzadzenieService.deleteDevice(this.urzadzenie);
      }
    });
  }
}
