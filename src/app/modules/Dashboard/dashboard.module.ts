import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PrescriptionsComponent } from './pages/prescriptions/prescriptions.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';

import { CardModule, FormFieldModule, ButtonModule } from '../../shared';
import { MedicineInfoComponent } from './components/medicine-info/medicine-info.component';
import { MedicineStatusComponent } from './components/medicine-status/medicine-status.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    PrescriptionsComponent,
    PrescriptionComponent,
    MedicineInfoComponent,
    MedicineStatusComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardComponent,
      children: [{
        path: '',
        component: PrescriptionsComponent
      }]
    }]),
    CardModule,
    FormFieldModule,
    ButtonModule
  ],
  exports: [
    RouterModule
  ]
})

export class DashboardModule { }
