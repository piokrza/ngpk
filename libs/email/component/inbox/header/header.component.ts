import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToggleButtonModule } from 'primeng/togglebutton';

const imports = [MenubarModule, ToggleButtonModule, FormsModule];

@Component({
  selector: 'ngpk-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports,
})
export class HeaderComponent {
  @Input() links!: MenuItem[];
  @Input() username!: string;

  isLightMode!: boolean;
  readonly emailSuffix = '@angular-email.com';
}
