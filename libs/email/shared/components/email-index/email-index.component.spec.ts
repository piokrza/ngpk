import { EmailIndexComponent } from './email-index.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('EmailIndexComponent', () => {
  let component: EmailIndexComponent;
  let fixture: ComponentFixture<EmailIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
