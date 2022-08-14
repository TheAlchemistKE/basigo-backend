import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Role, Roles } from '../roles';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @Roles(Role.LEAD)
  findAll() {
    return this.customersService.findAll();
  }
}
