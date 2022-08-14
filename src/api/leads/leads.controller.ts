import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { ILead } from './interfaces/lead.interface';
import { ICustomer } from './interfaces/customer.interface';
import { Roles } from '../roles';
import { Role } from '../roles';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post(':id')
  @Roles(Role.ADMIN)
  create(@Param('id') adminId: string, @Body() lead: ILead) {
    return this.leadsService.create(adminId, lead);
  }

  @Post(':id/customers')
  @Roles(Role.LEAD_ADMIN)
  addCustomer(@Param('id') leadId: string, @Body() customer: ICustomer) {
    return this.leadsService.update(leadId, customer);
  }

  @Get()
  @Roles(Role.LEAD)
  findAll() {
    return this.leadsService.findAll();
  }
}
