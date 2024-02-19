import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { TitleService } from '#core/services';

@Component({
  selector: 'org-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent implements OnInit {
  private readonly titleService = inject(TitleService);

  ngOnInit(): void {
    this.titleService.setTitle('settings');
  }
}
