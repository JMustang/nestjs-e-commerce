import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Users } from './../auth/user.entity';
import { ProductEntity } from './product.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async create(product: ProductEntity, user: Users): Promise<ProductEntity> {
    if (user.role === 'admin') {
      return await this.productRepository.save(product);
    }
    throw new UnauthorizedException({
      message: `User ${user}, is not authorized to create products`,
    });
  }

  async getOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOneBy({ id });
  }

  async update(
    id: number,
    product: ProductEntity,
    user: Users,
  ): Promise<UpdateResult> {
    if (user.role === 'admin') {
      return await this.productRepository.update(id, product);
    }
    throw new UnauthorizedException({
      message: `User ${user}, is not authorized to update products`,
    });
  }

  async delete(id: number, user: Users): Promise<DeleteResult> {
    if (user.role === 'admin') {
      return await this.productRepository.delete(id);
    }
    throw new UnauthorizedException({
      message: `User ${user}, is not authorized to delete products`,
    });
  }
}
