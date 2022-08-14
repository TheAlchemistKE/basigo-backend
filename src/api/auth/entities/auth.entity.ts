import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lead } from '../../leads/entities/lead.entity';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { Role } from '../../roles/role.enum';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Lead, (lead) => lead.createdBy)
  leads?: Lead[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.ADMIN,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;
}
