import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionComponent } from './prescription.component';
import { CardModule, ButtonModule, FormFieldModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';

describe('PrescriptionComponent', () => {
  let component: PrescriptionComponent;
  let fixture: ComponentFixture<PrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionComponent ],
      imports: [ CardModule, ButtonModule, FormFieldModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
