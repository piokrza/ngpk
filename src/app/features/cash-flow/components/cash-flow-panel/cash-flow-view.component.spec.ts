import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashFlowPanelComponent } from '@features/cash-flow/components/cash-flow-panel/cash-flow-panel.component';

describe('CashFlowPanelComponent', () => {
  let component: CashFlowPanelComponent;
  let fixture: ComponentFixture<CashFlowPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashFlowPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CashFlowPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
