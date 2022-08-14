import { Module } from '@nestjs/common';
import { LeadsModule } from './leads/leads.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LeadsModule, CustomersModule, ProductsModule, AuthModule],
})
export class ApiModule {}
