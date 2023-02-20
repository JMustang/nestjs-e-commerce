import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { Users } from 'src/auth/user.entity';
import { CartEntity } from './cart.entity';
import { ProductEntity } from 'src/product/product.entity';
import { CartController } from './cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, ProductEntity, Users])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
