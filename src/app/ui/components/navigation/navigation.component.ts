import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MenuService } from '@common/services/menu.service';
import { PersistanceService } from '@common/services/persistance.service';
import { ThemeService } from '@common/services/theme.service';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'ctrl-navigation',
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
