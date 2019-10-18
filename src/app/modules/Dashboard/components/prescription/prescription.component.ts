import { Component, OnInit } from '@angular/core';

import { IMedicine, PrescriptionsService, IDrugsInteraction, IPrescription } from '../../service/prescriptions.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dashboard-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {

  ERROR_MESSAGE = {
    required: 'Este campo é obrigatório!',
    minlength: 'Mínimo de 3 caracteres!',
    maxlength: 'Máximo de 255 caracteres!'
  };

  medicineDataList: IMedicine[] = [];
  isConfirmedInteraction = false;
  waitingConfirmation: IMedicine = null;
  selectedMedicineList: IMedicine[] = [];
  drugsInteractions: IDrugsInteraction[];

  prescriptionForm: FormGroup;

  constructor( private service: PrescriptionsService ) {
  }

  ngOnInit() {

    this.prescriptionForm = new FormGroup({
      patient: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      medicine: new FormControl('', [Validators.required])
    });

    this.prescriptionForm.get('medicine').valueChanges.subscribe( (val) => {
      if ( val && val.length > 2 ) {
        setTimeout( () => {
          this.service.listMedicines(val).subscribe(
            (response) => {
              this.medicineDataList = response.value;
            }
          );
        }, 400);
      }
    });

  }

  hasFieldError(typeField: string): boolean {
    if (
      this.prescriptionForm.get(typeField).getError('required') ||
      this.prescriptionForm.get(typeField).getError('minlength') ||
      this.prescriptionForm.get(typeField).getError('maxlength')
    ) {
      return true;
    }

    return false;
  }

  getErrorMensage(typeField: string): string {
    const errors = this.prescriptionForm.get(typeField).errors;
    const value = Object.keys(errors).toString();
    if ( this.ERROR_MESSAGE[value] ) {
      return this.ERROR_MESSAGE[value];
    }
  }

  selectedMedicine(ev: IMedicine) {
    const findEqual = this.selectedMedicineList.find( (x: IMedicine) => x.IdMedicamento === ev.IdMedicamento );
    if ( !findEqual ) {
      if ( this.service.needToValidate() ) {
        this.service.validateIteractions(this.selectedMedicineList, ev).subscribe(
          (response) => {
            this.drugsInteractions = response.value;
            if ( this.drugsInteractions.length === 0 ) {
              this.service.addMedicine(ev);
            } else {
              this.waitingConfirmation = ev;
            }
          }
        );
      } else {
        this.service.addMedicine(ev);
      }
    }
  }

  hasAvalibleForNewPrescription() {
    if (
      !this.hasFieldError('patient') &&
      this.service.hasDrugs()
    ) {
      return false;
    }
    return true;
  }

  createNewPrescription() {
    this.service.createPrescription(this.prescriptionForm.get('patient').value).subscribe(
      (response) => {
        if ( response ) {
          this.prescriptionForm.reset();
          this.medicineDataList = [];
        }
      }
    );
  }

}
