import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './../auth/user.entity';
import { Product } from './../product-inventory/products/product.entity';
import { CustomNamingStrategy } from './custom-naming.strategy';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  schema: 'ArticMarket',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'ArticMarket',
  entities: [Product, User],
  logging: 'all',
  synchronize: true,
  namingStrategy: new CustomNamingStrategy(),
};
