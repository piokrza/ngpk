import { ChangeDetectionStrategy, Component, EventEmitter, Output, WritableSignal, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PrimeIcons } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

import { ContainerComponent } from '#shared/components';

const imports = [TranslateModule, ContainerComponent, ReactiveFormsModule, InputTextModule];

@Component({
  selector: 'org-add-item-btn',
  templateUrl: './add-item-btn.component.html',
  styleUrl: './add-item-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class AddItemBtnComponent {
  @Output() itemNameSubmit = new EventEmitter<string>();

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly isEditing: WritableSignal<boolean> = signal<boolean>(false);
  readonly boardNameControl = new FormControl<string>('', { nonNullable: true });

  emitBoardName(): void {
    if (!this.boardNameControl.value.length) return;

    this.itemNameSubmit.emit(this.boardNameControl.value);
    this.isEditing.set(false);
  }

  setIsEditing(): void {
    this.isEditing.set(true);
  }
}
