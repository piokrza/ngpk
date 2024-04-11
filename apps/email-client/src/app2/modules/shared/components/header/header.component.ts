import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '@shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() links!: MenuItem[];
  @Input() username!: string;

  public isLightMode!: boolean;

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    this.handleThemeMode();
  }

  private handleThemeMode(): void {
    this.isLightMode = JSON.parse(localStorage.getItem('isLightMode')!);
    this.themeService.setTheme(this.isLightMode);
  }
}
