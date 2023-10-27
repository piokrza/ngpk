import { LanguageTogglerComponent } from './language-toggler.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('LanguageTogglerComponent', () => {
  let component: LanguageTogglerComponent;
  let fixture: ComponentFixture<LanguageTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageTogglerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
