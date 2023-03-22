import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MenuService } from '@common/services/menu.service';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'ctrl-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  private menuService: MenuService = inject(MenuService);

  public menuLinks$: Observable<MenuItem[]> = this.menuService.menuLinks$;

  public ngOnInit(): void {
    this.menuService.setLinks();
  }
}
