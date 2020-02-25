import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
} from 'typeorm';

import { Drug } from '../drug/drug.entity';

export interface DrugInteraction {
  id: number;
  nome: string;
  descricao: string;
  farmaco1id: number;
  farmaco2id: number;
  farmaco1: Drug;
  farmaco2: Drug;
  createdAt: string;
  updatedAt: string;
}

@Entity()
export class DrugInteraction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
  @Column({ type: 'text' })
  descricao: string;
  @RelationId((DrugInteraction: DrugInteraction) => DrugInteraction.farmaco1)
  farmaco1id: number;
  @RelationId((DrugInteraction: DrugInteraction) => DrugInteraction.farmaco2)
  farmaco2id: number;
  @ManyToOne(
    type => Drug,
    drug => drug.primaryDrugs,
    { eager: true },
  )
  farmaco1: Drug;
  @ManyToOne(
    type => Drug,
    drug => drug.secondaryDrugs,
    { eager: true },
  )
  farmaco2: Drug;
}
