import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesViewComponent } from './incomes-view.component';

describe('IncomesViewComponent', () => {
  let component: IncomesViewComponent;
  let fixture: ComponentFixture<IncomesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
