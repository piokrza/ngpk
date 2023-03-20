import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDetailsBoxComponent } from './income-details-box.component';

describe('IncomeDetailsBoxComponent', () => {
  let component: IncomeDetailsBoxComponent;
  let fixture: ComponentFixture<IncomeDetailsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeDetailsBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeDetailsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
