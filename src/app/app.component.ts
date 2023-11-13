import { Component, inject, OnInit } from '@angular/core';
import { AppFacade } from 'src/app/app.facade';

@Component({
  selector: 'ctrl-root',
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  private readonly appFacade: AppFacade = inject(AppFacade);

  public ngOnInit(): void {
    this.appFacade.setPrimengConfig();
    this.appFacade.onChainChange$().subscribe();
    this.appFacade.checkNetworks$().subscribe();
    this.appFacade.onAccountChanged$().subscribe();
    this.appFacade.initializeUserData$().subscribe();
    this.appFacade.checkWalletExtention$().subscribe();
    this.appFacade.requestChainIdAndAccounts$().subscribe();
  }
}
