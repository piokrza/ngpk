import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowDetailsListComponent } from './cash-flow-details-list.component';

describe('CashFlowDetailsListComponent', () => {
  let component: CashFlowDetailsListComponent;
  let fixture: ComponentFixture<CashFlowDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowDetailsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
