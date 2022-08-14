import { Role } from '../../roles/role.enum';

export interface IAdmin {
  email: string;
  password: string;
  salt: string;
  role: Role;
}
