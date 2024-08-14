import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

const imports = [RouterModule];

@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  styleUrl: './app.component.scss',
  standalone: true,
  imports,
})
export class AppComponent {
  title = 'zoneless';
}
