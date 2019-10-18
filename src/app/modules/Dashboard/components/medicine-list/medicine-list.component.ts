import { Component, OnInit } from '@angular/core';
import { IMedicine, PrescriptionsService } from '../../service/prescriptions.service';

@Component({
  selector: 'dashboard-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit {

  list: IMedicine[] = [];

  constructor( private service: PrescriptionsService ) {}

  ngOnInit() {
    this.service.currentDrugsList.subscribe( response => {
      this.list = response;
    });
  }

}
