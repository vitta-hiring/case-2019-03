import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineStatusComponent } from './medicine-status.component';

describe('MedicineStatusComponent', () => {
  let component: MedicineStatusComponent;
  let fixture: ComponentFixture<MedicineStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
