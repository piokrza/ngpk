import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { MenuService } from '@app/common/services/menu.service';
import { Observable } from 'rxjs';

const NavigationImports: Array<any> = [CommonModule, ButtonModule, TieredMenuModule];

@Component({
  selector: 'cctrl-navigation',
  standalone: true,
  imports: NavigationImports,
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  private menuService: MenuService = inject(MenuService);

  public menuLinks$: Observable<MenuItem[]> = this.menuService.menuLinks$;

  public ngOnInit(): void {
    this.menuService.setLinks();
  }
}
