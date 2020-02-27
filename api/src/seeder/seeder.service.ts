import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drug } from '../drug/drug.entity';
import { Repository } from 'typeorm';
import { DrugInteraction } from '../drug-interaction/drug-interaction.entity';
import { Medicine } from '../medicine/medicine.entity';

import { drugs } from './seeders/drugs';
import { drugInteractions } from './seeders/drugsInteractions';
import { medicines } from './seeders/medicines';

@Injectable()
export class SeederService {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<Drug>} drugRepository
   */
  constructor(
    @InjectRepository(Drug)
    private readonly drugRepository: Repository<Drug>,
    @InjectRepository(DrugInteraction)
    private readonly drugInteractionRepository: Repository<DrugInteraction>,
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
  ) {}
  /**
   * Seed all drugs.
   *
   * @function
   */
  async createDrug(): Promise<Drug[]> {
    return await this.drugRepository
      .findOne({ nome: drugs[0].nome })
      .then(async dbDrug => {
        // If it does don't create a new one.
        if (dbDrug) {
          return Promise.resolve(null);
        }
        return Promise.resolve(await this.drugRepository.create(drugs));
      })
      .catch(error => Promise.reject(error));
  }
  /**
   * Seed all drugs interactions.
   *
   * @function
   */
  createDrugInteractions(): Array<Promise<DrugInteraction>> {
    return (drugInteractions as unknown as DrugInteraction[]).map(async (drugInteraction: DrugInteraction) => {
      const drugs = await this.drugRepository.find({
        where: [
          { nome: drugInteraction.farmaco1 },
          { nome: drugInteraction.farmaco2 },
        ],
      });
      return await this.drugInteractionRepository
        .findOne({ nome: drugInteraction.nome })
        .then(async dbDrug => {
          // If it does don't create a new one.
          if (dbDrug) {
            return Promise.resolve(null);
          }
          drugInteraction.farmaco1 = drugs[0];
          drugInteraction.farmaco2 = drugs[1];
          return Promise.resolve(
            await this.drugInteractionRepository.create(drugInteraction)
          );
        })
        .catch(error => Promise.reject(error));
    });
  }
  /**
   * Seed all medicines.
   *
   * @function
   */
  createMedicines(): Array<Promise<Medicine[]>> {
    return (medicines as unknown as Medicine[]).map(async medicine => {
      const farmacos = await this.drugRepository.find({ where:  medicine.farmacos.map(farmaco => { nome: farmaco }) });
      return await this.medicineRepository
        .findOne({ nome: medicine.nome })
        .then(async dbDrug => {
          // If it does don't create a new one.
          if (dbDrug) {
            return Promise.resolve(null);
          }
          medicine.farmacos = farmacos;
          return Promise.resolve(await this.medicineRepository.create(medicine));
        })
        .catch(error => Promise.reject(error));

    })
  }

  async seed() {
    await this.drugsExec()
      .then(completed => {
        console.log('Successfuly completed seeding drugs...');
        Promise.resolve(completed);
      })
      .catch(error => {
        console.log('Failed seeding users...');
        Promise.reject(error);
      });
    await this.drugInteractionsExec()
      .then(completed => {
        console.log('Successfuly completed seeding drugs...');
        Promise.resolve(completed);
      })
      .catch(error => {
        console.log('Failed seeding users...');
        Promise.reject(error);
      });
    await this.medicinesExec()
      .then(completed => {
        console.log('Successfuly completed seeding drugs...');
        Promise.resolve(completed);
      })
      .catch(error => {
        console.log('Failed seeding users...');
        Promise.reject(error);
      });
  }

  async drugsExec() {
    return this.createDrug()
      .then(createdDrugs => {
        // Can also use this.logger.verbose('...');
        console.log(
          'No. of drugs created : ' +
            // Remove all null values and return only created drugs.
            createdDrugs.filter(nullValueOrCreated => nullValueOrCreated)
              .length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }

  async drugInteractionsExec() {
    return Promise.all(this.createDrugInteractions())
      .then(createdDrugsInteractions => {
        // Can also use this.logger.verbose('...');
        console.log(
          'No. of drgus interactions created : ' +
            // Remove all null values and return only created drgus interactions.
            createdDrugsInteractions.filter(
              nullValueOrCreated => nullValueOrCreated,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }

  async medicinesExec() {
    return Promise.all(this.createMedicines())
      .then(createdMedicines => {
        // Can also use this.logger.verbose('...');
        console.log(
          'No. of medicines created : ' +
            // Remove all null values and return only created medicines.
            createdMedicines.filter(nullValueOrCreated => nullValueOrCreated)
              .length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }
}
