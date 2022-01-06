import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Urzadzenie } from '../models/urzadzenie';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  urzadzenia: Urzadzenie[];
  checked = false;

  constructor() {
  }

  ngOnInit(): void {
    this.urzadzenia = [
      {
        id: 1,
        nazwa: 'sypialnia',
        wlaczone: false,
        temperatura: 20
      },
      {
        id: 2,
        nazwa: 'salon',
        wlaczone: true,
        temperatura: 15
      }
    ];
  }
}
