import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Drug } from '../drug/drug.entity';
import { Prescription } from '../prescription/prescription.entity';

export interface Medicine {
  id: number;
  nome: string;
  farmaco: string;
  concentracao: string;
  unidade: string;
  tipoMedicamento: string;
  formaFarmaceutica: string;
  viaAdministracao: string;
  codigoATC: string;
  usoInterno: boolean;
  antimicrobiano: boolean;
  bula: string;
  portaria344: string;
  controleEspecial: boolean;
  TISS: string;
  MIP: boolean;
  label: string;
  unificado: string;
  farmacos: Drug[];
  prescriptions: Prescription[];
  createdAt: string;
  updatedAt: string;
}

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
  @Column({ nullable: true })
  farmaco: string;
  @Column({ nullable: true })
  concentracao: string;
  @Column({ nullable: true })
  unidade: string;
  @Column({ nullable: true })
  tipoMedicamento: string;
  @Column({ nullable: true })
  formaFarmaceutica: string;
  @Column({ nullable: true })
  viaAdministracao: string;
  @Column({ nullable: true })
  codigoATC: string;
  @Column({type: 'boolean', nullable: true})
  usoInterno: boolean;
  @Column({type: 'boolean', nullable: true})
  antimicrobiano: boolean;
  @Column({ nullable: true })
  bula: string;
  @Column({ nullable: true })
  portaria344: string;
  @Column({type: 'boolean', nullable: true})
  controleEspecial: boolean;
  @Column({ nullable: true })
  TISS: string;
  @Column({type: 'boolean', nullable: true})
  MIP: boolean;
  @Column({ nullable: true })
  label: string;
  @Column({ nullable: true })
  unificado: string;

  @ManyToMany(type => Drug)
  @JoinTable()
  farmacos: Drug[];
  @ManyToMany(type => Prescription, prescription => prescription.medicines)
  prescriptions: Prescription[];
}
