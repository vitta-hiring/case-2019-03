import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { DrugInteraction } from 'src/drug-interaction/drug-interaction.entity';
import { Medicine } from 'src/medicine/medicine.entity';


export interface Drug {
  id?: number;
  nome: string;
  medicines: Medicine[];
  createdAt: string;
  updatedAt: string;
}

@Entity()
export class Drug {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column('varchar', { length: 255, unique: true })
  nome: string;
  @ManyToMany(type => Medicine, medicine => medicine.farmacos)
  medicines: Medicine[];
}
