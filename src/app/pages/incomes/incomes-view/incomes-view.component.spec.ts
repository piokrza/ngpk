import { IncomesViewComponent } from './incomes-view.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('IncomesViewComponent', () => {
  let component: IncomesViewComponent;
  let fixture: ComponentFixture<IncomesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
