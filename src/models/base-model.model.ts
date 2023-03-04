import {
  UpdateDateColumn,
  CreateDateColumn,
  Generated,
  PrimaryColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';
import { IntegerTransformer } from '../transformers/integerTransformer';
import { Exclude } from 'class-transformer';

export class BaseModel extends BaseEntity {
  @Generated('increment')
  @PrimaryColumn('bigint', {
    name: 'id',
    transformer: IntegerTransformer.getInstance(),
  })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}
