import { ExpensesViewComponent } from './expenses-view.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('ExpensesViewComponent', () => {
  let component: ExpensesViewComponent;
  let fixture: ComponentFixture<ExpensesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
