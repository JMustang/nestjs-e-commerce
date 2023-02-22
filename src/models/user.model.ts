import {
  Entity,
  OneToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { CartModel } from 'src/models/cart.model';
import { OrderModel } from 'src/models/order.model';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany((type) => CartModel, (cart) => cart.id)
  @JoinColumn()
  cart: CartModel[];

  @OneToOne((type) => OrderModel, (order) => order.id)
  @JoinColumn()
  order: OrderModel;
}
