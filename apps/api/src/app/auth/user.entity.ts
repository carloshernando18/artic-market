import * as bcryptjs from 'bcryptjs';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from '../product-inventory/products/product.entity';

@Entity({ schema: 'Security', name: 'User' })
@Unique('User_UserName_UK', ['userName'])
export class User extends BaseEntity {
  @Index('IUser_PK')
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Index('IUser_UserName_UK', { unique: true })
  @Column({ name: 'UserName' })
  userName: string;

  @Column({ name: 'Password' })
  password: string;

  @Column({ name: 'Salt' })
  salt: string;

  async validatePasssword(password: string): Promise<boolean> {
    const hash = await bcryptjs.hash(password, this.salt);
    return hash === this.password;
  }

  @Index('IFK_User_Product_ProductId')
  @OneToMany('Product', 'user', { eager: false })
  products: Product[];
}
