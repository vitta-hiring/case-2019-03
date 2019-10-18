import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Authentication/services/auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import _union from 'lodash/union';

export interface IDrugsInteraction {
  Descricao: string;
  Farmaco1: string;
  Farmaco2: string;
  Nome: string;
}

export interface IMedicine {
  IdMedicamento: number;
  Nome: string;
  Farmaco: string | null;
  Farmacos: string[];
  Concentracao: string;
  Unidade: string;
  TipoMedicamento: string;
  FormaFarmaceutica: string;
  ViaAdministracao: string;
  CodigoATC: string;
  UsoInterno: boolean;
  Antimicrobiano: boolean;
  Bula: string;
  Portaria344: string;
  ControleEspecial: boolean;
  TISS: string;
  MIP: boolean;
  Label: string;
  Unificado: any | null;
  Posologia?: string;
}

export interface IPrescription {
  patient: string;
  create_on: Date;
  drugs: IMedicine[];
}

@Injectable({
  providedIn: 'root'
})

export class PrescriptionsService {

  private prescriptionListSubject: BehaviorSubject<IPrescription[]>;
  public prescriptionList: Observable<IPrescription[]>;

  private currentDrugsListSubject: BehaviorSubject<IMedicine[]>;
  public currentDrugsList: Observable<IMedicine[]>;

  constructor( private router: Router, private authService: AuthenticationService, private http: HttpClient ) {



    this.prescriptionListSubject = new BehaviorSubject<IPrescription[]>(JSON.parse(localStorage.getItem('listPrescription')));
    this.prescriptionList = this.prescriptionListSubject.asObservable();

    this.currentDrugsListSubject = new BehaviorSubject<IMedicine[]>([]);
    this.currentDrugsList = this.currentDrugsListSubject.asObservable();

    this.authService.currentUser.subscribe( user => {
      if ( !user ) {
        this.router.navigate(['/']);
      }
    });
  }

  listMedicines(val: string): Observable<any> {
    return this.http.get('./assets/dados/medicamentos.json').pipe(
      map( (arMedicines: IMedicine[]) => {
        const filterMedicines = arMedicines.filter( med => med.Label && med.Label.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return of(filterMedicines);
      })
    );
  }

  validateIteractions(currList: IMedicine[], newMedicine: IMedicine): Observable<any> {
    let unionList = [];
    let gravidade = [];
    return this.http.get('./assets/dados/interacao_medicamentosa.json')
      .pipe(
        map( (interactions: IDrugsInteraction[]) => {
          currList.map( (med: IMedicine) => unionList = _union(unionList, med.Farmacos));
          unionList = _union(unionList, newMedicine.Farmacos);
          const filterInteractions = interactions.filter(
            (interaction: IDrugsInteraction) => {
              gravidade = _union(gravidade, [interaction.Nome]);

              const findFarmaco1 = unionList.find( ul => ul === interaction.Farmaco1 );
              const findFarmaco2 = unionList.find( ul => ul === interaction.Farmaco2 );

              if ( findFarmaco1 && findFarmaco2 ) {
                return interaction;
              }

            }
          );
          return of(filterInteractions);
        })
      );
  }

  addMedicine(val: IMedicine) {
    const current = this.currentDrugsListSubject.value || [];
    current.push(val);
    this.currentDrugsListSubject.next(current);
  }

  needToValidate() {
    const current = this.currentDrugsListSubject.value || [];
    if ( current.length > 0 ) {
      return true;
    }
    return false;
  }

  hasDrugs() {
    const current = this.currentDrugsListSubject.value || [];
    if ( current.length > 0 ) {
      return true;
    }
    return false;
  }

  createPrescription(patient: string): Observable<any> {

    const model: IPrescription = {
      patient,
      drugs: this.currentDrugsListSubject.value,
      create_on: new Date()
    };

    const current = this.prescriptionListSubject.value;
    current.push(model);
    localStorage.setItem('listPrescription', JSON.stringify(current));
    this.prescriptionListSubject.next(current);
    this.currentDrugsListSubject.next([]);

    return of(true);
  }

}
