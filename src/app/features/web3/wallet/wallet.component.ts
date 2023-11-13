import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class WalletComponent {}
