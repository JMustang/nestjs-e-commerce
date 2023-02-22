import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { OrderModel } from '../models/order.model';
import { ProductModel } from 'src/models/product.model';
import { CartModel } from 'src/models/cart.model';
import { Users } from 'src/models/user.model';
import { OrderController } from '../http/controllers/order.controller';
import { CartService } from 'src/services/cart.service';
import { ProductsService } from 'src/services/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderModel, ProductModel, CartModel, Users]),
  ],
  // controllers: [OrderController],
  providers: [OrderService, CartService, ProductsService],
  controllers: [OrderController],
})
export class OrderModule {}
