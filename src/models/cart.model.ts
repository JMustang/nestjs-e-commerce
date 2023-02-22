import {
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderModel } from 'src/models/order.model';
import { ProductModel } from 'src/models/product.model';
import { Users } from 'src/models/user.model';

@Entity()
export class CartModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @ManyToOne((type) => ProductModel, (order) => order.id)
  @JoinColumn()
  item: ProductModel;

  @ManyToOne((type) => Users, (user) => user.username)
  @JoinColumn()
  user: Users;
}
