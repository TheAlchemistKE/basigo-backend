import { GenderEnum } from '../../../shared/enums/gender.enum';

export interface ILead {
  firstName: string;
  middleName: string;
  lastName: string;
  location: string;
  gender: GenderEnum;
}
