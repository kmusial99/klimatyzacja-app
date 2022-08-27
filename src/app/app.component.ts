import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { KlimatyzatorService } from './service/klimatyzator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public visibleSidebar;
  public displayInfoModal: boolean;
  public displayContactModal: boolean;

  constructor(
    private primengConfig: PrimeNGConfig,
    private klimatyzatorService: KlimatyzatorService,
  ) {
    this.primengConfig.ripple = true;

    setInterval(async () => {
      console.log({
        free: window.os_performance.freemem(),
        total: window.os_performance.totalmem(),
        cpu: await window.os_performance.getCPUUsage(),
      });
    }, 1000);
  }

  public showInfoDialog(): void {
    this.displayInfoModal = true;
  }

  public showContactDialog(): void {
    this.displayContactModal = true;
  }
}
