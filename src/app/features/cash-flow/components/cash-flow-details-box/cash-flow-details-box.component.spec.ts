import { CashFlowDetailsBoxComponent } from './cash-flow-details-box.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('CashFlowDetailsBoxComponent', () => {
  let component: CashFlowDetailsBoxComponent;
  let fixture: ComponentFixture<CashFlowDetailsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowDetailsBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowDetailsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
