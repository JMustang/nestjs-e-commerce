import {
  Entity,
  OneToOne,
  JoinColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CartModel } from 'src/models/cart.model';
import { OrderModel } from 'src/models/order.model';
import { BaseModel } from './base-model.model';
import { Exclude } from 'class-transformer';
import { Role } from './role.model';

@Entity('users')
export class Users extends BaseModel {
  @Column('varchar', {
    name: 'username',
  })
  username: string;

  @Exclude()
  @Column('varchar', {
    name: 'password',
  })
  password: string;

  @ManyToMany(() => Role, (role) => role.user)
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: Role[];

  @OneToMany((type) => CartModel, (cart) => cart.id)
  @JoinColumn()
  carts: CartModel[];

  @OneToOne((type) => OrderModel, (order) => order.id)
  @JoinColumn()
  order: OrderModel;
}
