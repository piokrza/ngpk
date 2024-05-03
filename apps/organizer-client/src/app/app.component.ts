import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

const imports = [RouterModule];

@Component({
  selector: 'app-root',
  template: ` <h1>organizer client!!</h1> `,
  standalone: true,
  imports,
})
export class AppComponent {
  title = 'organizer-client';
}
