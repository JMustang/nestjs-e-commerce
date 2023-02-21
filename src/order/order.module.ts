import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { ProductEntity } from 'src/product/product.entity';
import { CartEntity } from 'src/cart/cart.entity';
import { Users } from 'src/auth/user.entity';
import { OrderController } from './order.controller';
import { CartService } from 'src/cart/cart.service';
import { ProductsService } from 'src/product/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, ProductEntity, CartEntity, Users]),
  ],
  // controllers: [OrderController],
  providers: [OrderService, CartService, ProductsService],
  controllers: [OrderController],
})
export class OrderModule {}
