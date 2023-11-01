import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Task } from '#features/tasker/models';

@Component({
  selector: 'ctrl-tasker-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  todos: Task[] = [
    {
      name: 'Odrobic lekcje',
      isComplete: true,
      id: '1242142',
      uid: 'N0Ld3pybT5ekuZzdAxuNzP4YWUH3',
    },
    {
      name: 'Pojsc do sklepu',
      isComplete: true,
      id: '421412',
      uid: 'N0Ld3pybT5ekuZzdAxuNzP4YWUH3',
    },
    {
      name: 'zrobic obiad',
      isComplete: true,
      id: '332123',
      uid: 'N0Ld3pybT5ekuZzdAxuNzP4YWUH3',
    },
  ];
}
