import {
  Entity,
  OneToMany,
  JoinColumn,
  OneToOne,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductModel } from 'src/models/product.model';
import { Users } from 'src/models/user.model';

@Entity()
export class OrderModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToMany((type) => ProductModel, (item) => item.id)
  items: ProductModel[];

  @OneToOne((type) => Users, (user) => user.username)
  @JoinColumn()
  user: Users;

  @Column()
  subTotal: number;

  @Column({ default: false })
  pending: boolean;
}
