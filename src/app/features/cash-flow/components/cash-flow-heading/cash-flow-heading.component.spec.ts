import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowHeadingComponent } from './cash-flow-heading.component';

describe('CashFlowHeadingComponent', () => {
  let component: CashFlowHeadingComponent;
  let fixture: ComponentFixture<CashFlowHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowHeadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
