import { Component, OnInit } from '@angular/core';
import { PrescriptionsService } from '../../service/prescriptions.service';
import moment from 'moment';
import _groupBy from 'lodash/groupBy';
import _map from 'lodash/map';

@Component({
  selector: 'dashboard-prescriptions-list',
  templateUrl: './prescriptions-list.component.html',
  styleUrls: ['./prescriptions-list.component.scss']
})
export class PrescriptionsListComponent implements OnInit {

  constructor(private service: PrescriptionsService) { }

  list = [];

  ngOnInit() {
    this.service.prescriptionList.subscribe( (response) => {
      this.formatCurrentList(response);
    });
  }

  formatCurrentList( currList ) {
    moment.locale('pt_BR');
    moment.updateLocale('pt_BR', {
      monthsShort : [
          'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ]
    });
    const curr = currList.map( (val) => {
      return {
        dayMonthYear: moment(val.create_on).format('DD/MMM/YYYY'),
        fullDate: moment(val.create_on).format('DD/MM/YYYY'),
        time: moment(val.create_on).format('HH:MM:SS'),
        patient: val.patient,
        drugs: val.drugs
      };
    });
    this.list =  _map(_groupBy(curr, 'dayMonthYear'),
      (key, value) => ({ values: key, date: value })
    );
  }

  getDay(val) {
    return val.split('/')[0];
  }

  getMonth(val) {
    return val.split('/')[1];
  }
  getYear(val) {
    return val.split('/')[2];
  }

}
