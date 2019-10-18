import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { IDrugsInteraction, IMedicine, PrescriptionsService } from '../../service/prescriptions.service';

@Component({
  selector: 'dashboard-medicine-status',
  templateUrl: './medicine-status.component.html',
  styleUrls: ['./medicine-status.component.scss']
})
export class MedicineStatusComponent implements OnChanges {

  @Input() currentMedicine: IMedicine;
  @Input() list: IDrugsInteraction[];

  showContent = false;

  constructor( private service: PrescriptionsService ) { }

  ngOnChanges( changes: SimpleChanges ) {
    const { list: { currentValue } } = changes;
    if ( currentValue && currentValue.length > 0 ) {
      this.showContent = true;
    }
  }

  handleStatusInteraction(type: string) {
    if ( type === 'Leve' ) {
      return 'info';
    }
    if ( type === 'Moderada') {
      return 'warning';
    }
    if ( type === 'Grave' ) {
      return 'danger';
    }
  }

  handleCancel() {
    this.showContent = false;
  }

  handleConfirm() {
    this.service.addMedicine(this.currentMedicine);
    this.showContent = false;
  }

}
