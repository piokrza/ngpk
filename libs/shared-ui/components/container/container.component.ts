import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngpk-container',
  styleUrl: './container.component.scss',
  templateUrl: './container.component.html',
  standalone: true,
})
export class ContainerComponent {
  @Input() styleClass: string[] = [];
}
