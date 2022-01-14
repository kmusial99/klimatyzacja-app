import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Urzadzenie } from '../models/urzadzenie';
import { UrzadzenieService } from '../service/urzadzenieService';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit, OnDestroy {

  urzadzenie: Urzadzenie;
  id;
  deviceToUpdate: Urzadzenie;
  sub;

  constructor(private activatedroute: ActivatedRoute,
              private router: Router,
              private urzadzenieService: UrzadzenieService) {
  }

  ngOnInit() {
    this.sub = this.activatedroute.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'));
      const urzadzenia = this.urzadzenieService.getUrzadzenia();
      this.urzadzenie = urzadzenia.filter(order => (order.id === this.id))[0];
    });
    this.deviceToUpdate = new Urzadzenie(this.urzadzenie.id, this.urzadzenie.nazwa, this.urzadzenie.wlaczone, this.urzadzenie.temperatura);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['home']);
  }

  save() {
    this.urzadzenieService.updateUrzadzenie(this.deviceToUpdate);
    this.router.navigate(['home']);
  }
}
