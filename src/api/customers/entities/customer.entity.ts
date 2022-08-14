import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { Lead } from '../../leads/entities/lead.entity';
import { Role } from '../../roles/role.enum';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.NONE,
  })
  gender: GenderEnum;

  @Column()
  photo?: string;

  @Column()
  annualEarning: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  role: Role;

  @Column('text', { array: true })
  productsOfInterest: string[];

  @ManyToOne(() => Lead, (lead) => lead.customers)
  createdBy: Lead;

  @CreateDateColumn()
  createdAt: Date;
}
