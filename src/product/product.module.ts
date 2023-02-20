import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';

@Module({
  controllers: [ProductController],
})
export class ProductModule {}
