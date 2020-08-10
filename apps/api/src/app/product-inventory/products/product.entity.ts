import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/user.entity';
@Entity({ schema: 'ProductInventory', name: 'Product' })
export class Product extends BaseEntity {
  @Index()
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Name' })
  name: string;

  // @ManyToOne('User', 'products', { eager: false, nullable: false })
  @ManyToOne((type) => User, (user) => user.products, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: 'UserId' })
  @Index()
  user: User;
}
