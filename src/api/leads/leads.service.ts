import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { Repository } from 'typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Auth } from '../auth/entities/auth.entity';
import { ICustomer } from './interfaces/customer.interface';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead) private readonly leadRepository: Repository<Lead>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}
  public async create(adminId, data: any): Promise<Lead> {
    const admin = await this.authRepository.findOne({ where: { id: adminId } });
    const lead = new Lead();
    lead.firstName = data.firstName;
    lead.middleName = data.middleName;
    lead.lastName = data.lastName;
    lead.location = data.location;
    lead.gender = data.gender;
    const newLead = await this.leadRepository.create({
      ...lead,
      createdBy: admin,
    });
    return await this.leadRepository.save(newLead);
  }

  public async findAll(): Promise<Lead[]> {
    return await this.leadRepository.find();
  }

  public async findOne(id: string) {
    return await this.leadRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  public async update(id: string, data: ICustomer): Promise<Customer> {
    const creatorLead = await this.leadRepository.findOne({
      where: {
        id: id,
      },
    });
    const productsOfInterest = [];
    const newCustomer = new Customer();
    newCustomer.firstName = data.firstName;
    newCustomer.middleName = data.middleName;
    newCustomer.lastName = data.lastName;
    newCustomer.location = data.location;
    newCustomer.gender = data.gender;
    newCustomer.photo = data.photo;
    newCustomer.annualEarning = data.annualEarning;
    newCustomer.role = data.role;

    if (
      newCustomer.annualEarning >= 10000 &&
      newCustomer.annualEarning < 20000
    ) {
      productsOfInterest.push('A');
    } else if (
      newCustomer.annualEarning >= 20000 &&
      newCustomer.annualEarning < 30000
    ) {
      productsOfInterest.push('A', 'B');
    } else if (newCustomer.annualEarning >= 30000) {
      productsOfInterest.push('A', 'B', 'C');
    }
    newCustomer.productsOfInterest = productsOfInterest;
    const customer = await this.customerRepository.create({
      ...newCustomer,
      createdBy: creatorLead,
    });

    return await this.customerRepository.save(customer);
  }
}
