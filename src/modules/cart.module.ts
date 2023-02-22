import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { Users } from 'src/models/user.model';
import { CartModel } from '../models/cart.model';
import { ProductModel } from 'src/models/product.model';
import { CartController } from '../http/controllers/cart.controller';
import { ProductsService } from 'src/services/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartModel, ProductModel, Users])],
  providers: [CartService, ProductsService],
  controllers: [CartController],
})
export class CartModule {}
