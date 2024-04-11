import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { ThemeService } from '@ngpk/email/service';

const imports = [MenubarModule, ToggleButtonModule, FormsModule];

@Component({
  selector: 'ngpk-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports,
})
export class HeaderComponent implements OnInit {
  readonly themeService = inject(ThemeService);

  @Input() links!: MenuItem[];
  @Input() username!: string;

  isLightMode!: boolean;
  readonly emailSuffix = '@angular-email.com';

  ngOnInit(): void {
    this.handleThemeMode();
  }

  private handleThemeMode(): void {
    this.isLightMode = JSON.parse(localStorage.getItem('isLightMode') ?? 'false');
    this.themeService.setTheme(this.isLightMode);
  }
}
