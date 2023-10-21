import { CashFlowUpdateFormComponent } from './cash-flow-update-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('CashFlowUpdateFormComponent', () => {
  let component: CashFlowUpdateFormComponent;
  let fixture: ComponentFixture<CashFlowUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
