import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartEntity } from 'src/–flat/cart/cart.entity';
import { OrderEntity } from 'src/–flat/order/order.entity';

@Entity()
export class UserEntity {
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

  @OneToMany((type) => CartEntity, (cart) => cart.id)
  @JoinColumn()
  cart: CartEntity[];

  @OneToMany((type) => OrderEntity, (order) => order.id)
  @JoinColumn()
  order: OrderEntity;
}
