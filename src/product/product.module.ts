import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductEntity } from './product.entity';
import { Users } from 'src/auth/user.entity';
import { CartEntity } from 'src/cart/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, Users, CartEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductModule {}
