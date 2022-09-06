import { Component, Input, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html'
})
export class GraphComponent {
  @ViewChild(UIChart) chart: UIChart;

  @Input()
  set aktualnaTemperatura(aktTemp: number) {
    this.iteration = this.iteration + 5;
    this.aktTemp = aktTemp;
    this.aktTempBS.next(aktTemp);
    this.chart?.refresh();
  }

  public aktTemp: number = null;
  public iteration = 0;
  private aktTempBS = new BehaviorSubject<number>(null);
  data: any;

  constructor() {
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Temperatura',
          data: [],
          fill: true,
          borderColor: '#9FA8DA',
          tension: .4,
          backgroundColor: 'rgba(159, 168, 218, 0.6)'
        }
      ],

    }
    this.aktTempBS.subscribe(value => {
      this.data.datasets[0].data.push(value);
      this.data.labels.push(this.iteration);
    });
  }
}
