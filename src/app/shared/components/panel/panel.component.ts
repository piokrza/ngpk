import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

import { ContainerComponent } from '#shared/components';

const imports = [SidebarModule, ButtonModule, FormsModule, ContainerComponent, RouterOutlet];

@Component({
  selector: 'org-panel',
  templateUrl: './panel.component.html',
  standalone: true,
  imports,
})
export class PanelComponent {
  sidebarVisible = false;

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
}
