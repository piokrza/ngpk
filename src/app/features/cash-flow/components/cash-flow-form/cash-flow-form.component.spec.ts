import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowFormComponent } from './cash-flow-form.component';

describe('CashFlowFormComponent', () => {
  let component: CashFlowFormComponent;
  let fixture: ComponentFixture<CashFlowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
