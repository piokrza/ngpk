import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { MenuService } from '@common/services/menu.service';
import { Observable } from 'rxjs';
import { NavSidebarComponent } from '@standalone/components/nav-sidebar/nav-sidebar.component';
import { ContainerComponent } from '@standalone/components/container/container.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '@common/services/theme.service';
import { PersistanceService } from '@common/services/persistance.service';

const NavigationImports: Array<any> = [
  CommonModule,
  ButtonModule,
  TieredMenuModule,
  NavSidebarComponent,
  ContainerComponent,
  ToggleButtonModule,
  FormsModule,
];

@Component({
  selector: 'ctrl-navigation',
  standalone: true,
  imports: NavigationImports,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  public themeService: ThemeService = inject(ThemeService);
  private menuService: MenuService = inject(MenuService);
  private persistanceService: PersistanceService = inject(PersistanceService);

  public menuLinks$: Observable<MenuItem[]> = this.menuService.menuLinks$;
  public isLightMode: boolean = this.persistanceService.get('isLightMode');

  public ngOnInit(): void {
    this.menuService.setLinks();
    this.themeService.setTheme(this.isLightMode);
  }
}
