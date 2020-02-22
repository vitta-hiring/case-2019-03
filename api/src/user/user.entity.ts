import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';


export enum UserRole {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
  BOTH = 'both',
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  recoveryPassToken: number;
  recoveryPassExpirationDate: string;
  emailIsVerified: boolean;
  emailToken: string;
  emailTokenExpirationDate: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 200 })
  firstName: string;
  @Column('varchar', { length: 200 })
  lastName: string;
  @Column('varchar', { length: 100 })
  password: string;
  @Column()
  recoveryPassToken: number;
  @Column()
  recoveryPassExpirationDate: string;
  
  @Column({unique: true})
  email: string;
  @Column({
    type: 'boolean',
    default: false,
  })
  emailIsVerified: boolean;

  @Column({type: 'varchar', nullable: true})
  emailToken: string;
  @Column({nullable: true})
  emailTokenExpirationDate: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PATIENT,
  })
  role: UserRole;
}
