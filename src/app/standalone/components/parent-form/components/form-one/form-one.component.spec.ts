import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOneComponent } from './form-one.component';

describe('FormOneComponent', () => {
  let component: FormOneComponent;
  let fixture: ComponentFixture<FormOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
