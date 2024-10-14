import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JiraLayoutComponent } from '@ngpk/shared-ui/components/jira-layout';

const imports = [RouterModule, JiraLayoutComponent];

@Component({
  selector: 'app-root',
  template: `
    <ngpk-jira-layout>
      <div class="flex justify-between">
        <h1 clas>dupa</h1>
        <h1 clas>dupa</h1>
      </div>
    </ngpk-jira-layout>
  `,
  styleUrl: './app.component.scss',
  standalone: true,
  imports,
})
export class AppComponent {
  title = 'jira-client';
}
