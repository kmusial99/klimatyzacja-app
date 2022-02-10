import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

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
    private electronService: ElectronService,
    private translate: TranslateService
  ) {
    this.primengConfig.ripple = true;
    this.translate.setDefaultLang('en');
  }

  public showInfoDialog(): void {
    this.displayInfoModal = true;
  }

  public showContactDialog(): void {
    this.displayContactModal = true;
  }
}
