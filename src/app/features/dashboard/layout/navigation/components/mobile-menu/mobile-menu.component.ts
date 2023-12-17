import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, WritableSignal, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { FADE_IN } from '#common/constants';

@Component({
  selector: 'ctrl-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [FADE_IN],
})
export class MobileMenuComponent {
  private readonly elRef: ElementRef = inject(ElementRef);

  @Input() menuItems!: MenuItem[];

  @HostListener('document:click', ['$event.target']) onClick(target: EventTarget) {
    if (this.isOpen() && !this.elRef.nativeElement.contains(target)) {
      this.isOpen.set(false);
    }
  }

  public isOpen: WritableSignal<boolean> = signal(false);

  public toggle(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  public itemClick(command?: any): void {
    command && command();
    this.isOpen.set(false);
  }
}
