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
import { MedicineListComponent } from './components/medicine-list/medicine-list.component';
import { PrescriptionsListComponent } from './components/prescriptions-list/prescriptions-list.component';

import { UserService } from './service/user.service';
import { PrescriptionsService } from './service/prescriptions.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    PrescriptionsComponent,
    PrescriptionComponent,
    MedicineInfoComponent,
    MedicineStatusComponent,
    MedicineListComponent,
    PrescriptionsListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  ],
  providers: [
    UserService,
    PrescriptionsService
  ]
})

export class DashboardModule { }
