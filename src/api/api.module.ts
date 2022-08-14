import { Module } from '@nestjs/common';
import { LeadsModule } from './leads/leads.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LeadsModule, CustomersModule, AuthModule],
})
export class ApiModule {}
