import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineInfoComponent } from './medicine-info.component';

describe('MedicineInfoComponent', () => {
  let component: MedicineInfoComponent;
  let fixture: ComponentFixture<MedicineInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
