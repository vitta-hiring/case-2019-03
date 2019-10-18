import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionsComponent } from './prescriptions.component';
import { PrescriptionComponent } from '../../components/prescription/prescription.component';
import { PrescriptionsListComponent } from '../../components/prescriptions-list/prescriptions-list.component';
import { CardModule, ButtonModule, FormFieldModule } from 'src/app/shared';

describe('PrescriptionsComponent', () => {
  let component: PrescriptionsComponent;
  let fixture: ComponentFixture<PrescriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionsComponent, PrescriptionComponent, PrescriptionsListComponent ],
      imports: [ CardModule, ButtonModule, FormFieldModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
