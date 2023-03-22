import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowViewComponent } from './cash-flow-panel.component';

describe('CashFlowViewComponent', () => {
  let component: CashFlowViewComponent;
  let fixture: ComponentFixture<CashFlowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashFlowViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CashFlowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
