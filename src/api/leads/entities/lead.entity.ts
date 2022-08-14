import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { Auth } from '../../auth/entities/auth.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { Role } from '../../roles/role.enum';

@Entity()
export class Lead {
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

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.LEAD,
  })
  role: Role;

  @ManyToOne(() => Auth, (admin) => admin.leads)
  createdBy!: Auth;

  @OneToMany(() => Customer, (customer) => customer.createdBy)
  customers?: Customer[];

  @CreateDateColumn()
  createdAt: Date;
}
