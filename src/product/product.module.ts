import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductsService],
})
export class ProductModule {}
