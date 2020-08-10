import * as bcryptjs from 'bcryptjs';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../product-inventory/products/product.entity';

@Entity({ schema: 'Security', name: 'User' })
@Unique('User_UserName_UK', ['userName'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Index({ unique: true })
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

  @OneToMany('Product', 'user', { eager: false })
  products: Product[];

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'ModifiedAt' })
  modifiedAt: Date;
}
