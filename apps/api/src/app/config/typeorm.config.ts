import { Product } from './../product-inventory/products/product.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'ArticMarket',
  entities: [Product],
  logging: 'all',
  synchronize: true,
};
