import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-guard';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('api/v1/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async order(@Request() req): Promise<any> {
    return this.orderService.order(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrders(@Request() req): Promise<OrderEntity[]> {
    return await this.orderService.getOrders(req.user.username);
  }
}
