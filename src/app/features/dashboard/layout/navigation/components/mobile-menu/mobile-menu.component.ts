import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, WritableSignal, inject, signal } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { FADE_IN } from '#core/constants';

@Component({
  selector: 'org-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [FADE_IN],
})
export class MobileMenuComponent {
  private readonly elRef: ElementRef = inject(ElementRef);

  readonly isOpen: WritableSignal<boolean> = signal(false);

  @Input() menuItems!: MenuItem[];

  @HostListener('document:click', ['$event.target']) onClick(target: EventTarget) {
    if (this.isOpen() && !this.elRef.nativeElement.contains(target)) {
      this.isOpen.update(() => false);
    }
  }

  toggleIsOpen(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  itemClick(command?: any): void {
    command && command();
    this.isOpen.update(() => false);
  }
}
