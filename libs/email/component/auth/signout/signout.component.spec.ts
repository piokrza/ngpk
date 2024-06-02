import { SignoutComponent } from './signout.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('SignoutComponent', () => {
  let component: SignoutComponent;
  let fixture: ComponentFixture<SignoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
