import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { OrderModel } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

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
  async getOrders(@Request() req): Promise<OrderModel[]> {
    return await this.orderService.getOrders(req.user.username);
  }
}
