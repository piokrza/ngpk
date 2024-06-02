import { EmailShowComponent } from './email-show.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('EmailShowComponent', () => {
  let component: EmailShowComponent;
  let fixture: ComponentFixture<EmailShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailShowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
