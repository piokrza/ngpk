import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Web3Component } from '#web3/.';
import { WalletComponent } from '#web3/components/wallet';
import { WEB3_CONFIG, web3Config } from '#web3/config';
import { MetamaskService, Web3Facade, Web3State } from '#web3/data-access';

const routes: Routes = [{ path: '', component: Web3Component }];

const declarations = [Web3Component];
const imports = [RouterModule.forChild(routes), WalletComponent];
const providers = [{ provide: WEB3_CONFIG, useValue: web3Config }, Web3Facade, Web3State, MetamaskService];

@NgModule({ declarations, imports, providers })
export default class Web3Module {}
