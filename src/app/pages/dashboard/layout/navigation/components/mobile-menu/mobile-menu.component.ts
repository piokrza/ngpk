import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, WritableSignal, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ctrl-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('150ms ease-out', style({ opacity: 1 }))]),
      transition(':leave', [animate('150ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class MobileMenuComponent implements OnInit {
  public constructor(
    private readonly renderer: Renderer2,
    private readonly elRef: ElementRef
  ) {}

  @Input() menuItems!: MenuItem[];

  public isOpen: WritableSignal<boolean> = signal(false);

  public ngOnInit(): void {
    this.renderer.addClass(this.elRef.nativeElement, 'fadeIn');
  }

  public toggle(): void {
    this.isOpen.set(!this.isOpen());
  }

  public itemClick(command?: any) {
    command && command();
    this.isOpen.set(false);
  }
}
