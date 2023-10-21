import { FormTwoComponent } from './form-two.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('FormTwoComponent', () => {
  let component: FormTwoComponent;
  let fixture: ComponentFixture<FormTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
