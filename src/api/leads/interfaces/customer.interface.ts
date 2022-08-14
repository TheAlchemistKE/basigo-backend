import { Role } from '../../roles/role.enum';
import { GenderEnum } from '../../../shared/enums/gender.enum';

export interface ICustomer {
  firstName: string;
  middleName: string;
  lastName: string;
  location: string;
  gender: GenderEnum;
  photo: string;
  annualEarning: number;
  role: Role;
  date: Date;
  productsOfInterest: string[];
}
