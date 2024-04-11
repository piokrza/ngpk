import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';

import { EmailSummary } from '@ngpk/email/model';
const imports = [TableModule, RouterLink];

@Component({
  selector: 'ngpk-email-index',
  templateUrl: './email-index.component.html',
  styleUrl: './email-index.component.scss',
  standalone: true,
  imports,
})
export class EmailIndexComponent {
  @Input() emails!: EmailSummary[];
}
