import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Users } from '../models/user.model';
import { ProductModel } from '../models/product.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductModel)
    private productRepository: Repository<ProductModel>,
  ) {}

  async getAll(): Promise<ProductModel[]> {
    return await this.productRepository.find();
  }

  async create(product: ProductModel, user: Users): Promise<ProductModel> {
    if (user.roles.some((role) => role.initials === 'admin')) {
      return await this.productRepository.save(product);
    }
    throw new UnauthorizedException({
      message: `User ${user}, is not authorized to create products`,
    });
  }

  async getOne(id: number): Promise<ProductModel> {
    return this.productRepository.findOneBy({ id });
  }

  async update(
    id: number,
    product: ProductModel,
    user: Users,
  ): Promise<UpdateResult> {
    if (user.roles.some((role) => role.initials === 'admin')) {
      return await this.productRepository.update(id, product);
    }
    throw new UnauthorizedException({
      message: `User ${user}, is not authorized to update products`,
    });
  }

  async delete(id: number, user: Users): Promise<DeleteResult> {
    if (user.roles.some((role) => role.initials === 'admin')) {
      return await this.productRepository.delete(id);
    }
    throw new UnauthorizedException({
      message: `User ${user}, is not authorized to delete products`,
    });
  }
}
