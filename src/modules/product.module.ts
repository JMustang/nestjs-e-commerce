import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsController } from '../http/controllers/products.controller';
import { ProductsService } from '../services/products.service';
import { ProductModel } from '../models/product.model';
import { Users } from 'src/models/user.model';
import { CartModel } from 'src/models/cart.model';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel, Users, CartModel])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductModule {}
