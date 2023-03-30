import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowAddFormComponent } from './cash-flow-add-form.component';

describe('CashFlowFormComponent', () => {
  let component: CashFlowAddFormComponent;
  let fixture: ComponentFixture<CashFlowAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashFlowAddFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CashFlowAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
