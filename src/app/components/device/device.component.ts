import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Urzadzenie } from '../../models/urzadzenie';
import { UrzadzenieService } from '../../service/urzadzenie.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  providers: [ConfirmationService, MessageService,]
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
    this.deviceToUpdate.dataPlanowanegoWlaczenia.setSeconds(0);
    this.urzadzenieService.updateUrzadzenie(this.deviceToUpdate);
    this.urzadzenieService.setDeviceToPopup(this.deviceToUpdate)
    this.router.navigate(['home']);
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
        this.urzadzenieService.setDeviceToPopup(this.deviceToUpdate)
        this.router.navigate(['home']);
        this.urzadzenieService.deleteDevice(this.urzadzenie);
      }
    });
  }
}
