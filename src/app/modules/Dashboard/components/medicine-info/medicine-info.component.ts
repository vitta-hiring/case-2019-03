import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMedicine } from '../../service/prescriptions.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'dashboard-medicine-info',
  templateUrl: './medicine-info.component.html',
  styleUrls: ['./medicine-info.component.scss']
})
export class MedicineInfoComponent implements OnInit {

  showComplement = false;
  posologiaForm: FormGroup;
  selectedMedicine: IMedicine;

  @Output() handleSelect = new EventEmitter();

  @Input() options: IMedicine[] = [];

  constructor() {}

  ngOnInit() {
    this.posologiaForm = new FormGroup({
      posologia: new FormControl('', Validators.required)
    });
  }

  hasFormError() {
    if ( this.posologiaForm.get('posologia').getError('required') ) {
      return true;
    }
    return false;
  }

  handleClick(ev: IMedicine) {
    this.selectedMedicine = ev;
    this.showComplement = true;
  }

  isDisabledConfirmation() {
    return !this.posologiaForm.valid;
  }

  handleSubmit() {
    this.selectedMedicine.Posologia = this.posologiaForm.get('posologia').value;
    this.posologiaForm.get('posologia').setValue('');
    this.handleSelect.emit(this.selectedMedicine);
    this.showComplement = false;
  }

  resetSelectedMedicine() {
    this.selectedMedicine = null;
    this.showComplement = false;
  }

}
