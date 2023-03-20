import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDetailsListComponent } from './income-details-list.component';

describe('IncomeDetailsListComponent', () => {
  let component: IncomeDetailsListComponent;
  let fixture: ComponentFixture<IncomeDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeDetailsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
