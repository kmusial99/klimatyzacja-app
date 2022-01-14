import { Component } from '@angular/core';
import { Urzadzenie } from '../models/urzadzenie';
import { Router } from '@angular/router';
import { UrzadzenieService } from '../service/urzadzenieService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  urzadzenia: Urzadzenie[];

  constructor(private router: Router,
              private urzadzenieService: UrzadzenieService) {
    this.urzadzenia = this.urzadzenieService.getUrzadzenia();
  }
}
