import { ChangeDetectionStrategy, Component, EventEmitter, Output, WritableSignal, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PrimeIcons } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

import { ContainerComponent } from '#shared/components';

const imports = [TranslateModule, ContainerComponent, TooltipModule, ReactiveFormsModule, InputTextModule];

@Component({
  selector: 'org-add-task-btn',
  templateUrl: './add-task-btn.component.html',
  styleUrl: './add-task-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class AddTaskBtnComponent {
  @Output() addBoard = new EventEmitter<string>();

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly isEditing: WritableSignal<boolean> = signal<boolean>(false);
  readonly boardNameControl = new FormControl<string>('', { nonNullable: true });

  emitBoardName(): void {
    if (!this.boardNameControl.value.length) return;

    this.addBoard.emit(this.boardNameControl.value);
    this.isEditing.set(false);
  }

  setIsEditing(): void {
    this.isEditing.set(true);
    // add focus to input
  }
}
