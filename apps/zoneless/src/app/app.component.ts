import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const imports = [RouterOutlet];

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<router-outlet />`,
  styleUrl: './app.component.scss',
  imports,
})
export class AppComponent {
  title = 'zoneless';
}
