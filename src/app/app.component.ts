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
  public displayCpuUsageModal: boolean;
  public takenMemoryInMB: number;
  public freeMemoryInMB: number;
  public totalMemoryInMB: number;
  public cpuUsage: number;

  constructor(
    private primengConfig: PrimeNGConfig,
    private klimatyzatorService: KlimatyzatorService,
  ) {
    this.primengConfig.ripple = true;

    setInterval(async () => {
      this.freeMemoryInMB = Math.round(window.os_performance.freemem() * 100) / 100;
      this.totalMemoryInMB = Math.round(window.os_performance.totalmem() * 100) / 100;
      this.cpuUsage = Math.round(await window.os_performance.getCPUUsage() * 100) / 100;
      this.takenMemoryInMB = Math.round(this.totalMemoryInMB - this.freeMemoryInMB);
    }, 1000);
  }

  public showInfoDialog(): void {
    this.displayInfoModal = true;
  }

  public showContactDialog(): void {
    this.displayContactModal = true;
  }

  public showCPUUsageDialog(): void {
    this.displayCpuUsageModal = true;
  }
}
