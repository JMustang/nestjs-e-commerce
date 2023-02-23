import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Users } from './user.model';
import { BaseModel } from './base-model.model';

@Entity('role')
export class Role extends BaseModel {
  @Column('varchar', {
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    name: 'initials',
  })
  initials: string;

  @ManyToMany(() => Users, (Users) => Users.roles)
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'role_id',
    },
    inverseJoinColumn: {
      name: 'user_id',
    },
  })
  user: Users;
}
