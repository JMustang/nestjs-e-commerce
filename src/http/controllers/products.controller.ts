import { ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductModel } from '../../models/product.model';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { ProductsService } from '../../services/products.service';
import {
  Controller,
  Delete,
  Param,
  Request,
  UseGuards,
  Get,
  Post,
  Put,
  Body,
} from '@nestjs/common';

@ApiTags('Products')
@Controller('api/v1/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async GetAll(): Promise<ProductModel[]> {
    return await this.productsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async Create(
    @Request() req,
    @Body() product: ProductModel,
  ): Promise<ProductModel> {
    return await this.productsService.create(product, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async GetOne(@Param() id: number): Promise<ProductModel> {
    return await this.productsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async Update(
    @Param() id: number,
    @Body() product: ProductModel,
    @Request() req,
  ): Promise<UpdateResult> {
    return await this.productsService.update(id, product, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async Delete(@Param() id: number, @Request() req): Promise<DeleteResult> {
    return await this.productsService.delete(id, req.user);
  }
}
