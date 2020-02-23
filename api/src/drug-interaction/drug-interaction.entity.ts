import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from 'typeorm';

import { Drug } from '../drug/drug.entity';

export interface DrugInteraction {
  id: number;
  nome: string;
  descricao: string;
  farmaco1: string;
  farmaco2: string;
  createdAt: string;
  updatedAt: string;
}

@Entity()
export class DrugInteraction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
  @Column({type: 'text'})
  descricao: string;
  @Column()
  farmaco1: string;
  @Column()
  farmaco2: string;

}
