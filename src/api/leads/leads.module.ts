import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Auth } from '../auth/entities/auth.entity';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lead, Customer, Auth])],
  controllers: [LeadsController],
  providers: [LeadsService, AuthService],
})
export class LeadsModule {}
