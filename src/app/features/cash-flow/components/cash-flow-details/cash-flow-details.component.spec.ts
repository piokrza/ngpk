import { CashFlowDetailsComponent } from './cash-flow-details.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('CashFlowDetailsComponent', () => {
  let component: CashFlowDetailsComponent;
  let fixture: ComponentFixture<CashFlowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
