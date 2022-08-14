import { GenderEnum } from '../../../shared/enums/gender.enum';
import { Role } from '../../roles';

export interface ILead {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  location: string;
  gender: GenderEnum;
}
