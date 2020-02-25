import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Medicine } from 'src/medicine/medicine.entity';

export interface Prescription {
  id: number;
  description: string;
  medicines: Medicine[];
  patient: User;
  createdAt: string;
  updatedAt: string;
}

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  description: string;
  @ManyToMany(
    type => Medicine,
    medicine => medicine.prescriptions,
    { eager: true },
  )
  @JoinTable()
  medicines: Medicine[];
  @ManyToOne(
    type => User,
    user => user.prescriptions,
  )
  patient: User;
}
