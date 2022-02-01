import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Urzadzenie } from '../../models/urzadzenie';
import { UrzadzenieService } from '../../service/urzadzenieService';
import { ConfirmationService, ConfirmEventType, Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  providers: [ConfirmationService,MessageService]
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
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.sub = this.activatedroute.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'));
      const urzadzenia = this.urzadzenieService.getUrzadzenia();
      this.urzadzenie = urzadzenia.filter(order => (order.id === this.id))[0];
    });
    this.deviceToUpdate = new Urzadzenie(
      this.urzadzenie.id,
      this.urzadzenie.nazwa,
      this.urzadzenie.wlaczone,
      this.urzadzenie.temperatura,
      this.urzadzenie.czyZaplanowaneWlaczenie,
      null
    );
    this.deviceToUpdate.dataPlanowanegoWlaczenia =
      this.urzadzenie.czyZaplanowaneWlaczenie ? this.urzadzenie.dataPlanowanegoWlaczenia : this.newDate;
  }

  ngOnDestroy() {
    this.dateInPast(this.deviceToUpdate.dataPlanowanegoWlaczenia);
    this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['home']);
  }

  save() {
    this.deviceToUpdate.dataPlanowanegoWlaczenia.setSeconds(0);
    this.urzadzenieService.updateUrzadzenie(this.deviceToUpdate);
    this.router.navigate(['home']);
  }

  addMessages() {
    this.messages = [
      { severity: 'success', summary: 'Zaplanowano uruchomienie', detail: '' }
    ];
  }

  dateInPast(ourDate: Date) {
    if (this.deviceToUpdate.czyZaplanowaneWlaczenie === true) {
      if (ourDate <= new Date()) {
        this.urzadzenie.wlaczone = true;
        this.deviceToUpdate.wlaczone = true;
        this.urzadzenie.czyZaplanowaneWlaczenie = false;
        this.deviceToUpdate.czyZaplanowaneWlaczenie = false;
      }
    }
  }

  private deleteDevice(): void {
    this.urzadzenieService.deleteDevice(this.urzadzenie.id);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public delete(): void {
    this.confirmationService.confirm({
      message: 'Jesteś pewny, że chcesz usunąć to urządzenie?',
      accept: ref => {
        ref.offsetHeight = 1;
        this.deleteDevice();
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public delete1(): void {
    this.confirmationService.confirm({
      message: 'Jesteś pewny, że chcesz usunąć to urządzenie?',
      header: 'Usuwanie urządzenia',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
      },
      reject: (type) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            break;
        }
      }
    });
  }
}
