import { OrderEntity } from './order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/auth/user.entity';
import { CartService } from 'src/cart/cart.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private cartService: CartService,
  ) {}

  async order(user: string): Promise<any> {
    // procurar os pedidos dos usuários
    const usersOrder = await this.orderRepository.find({
      relations: ['user'],
    });
    const userOrder = usersOrder.filter(
      (order) => order.user?.username === user && order.pending === false,
    );

    // procurar os itens do carrinho do usuário
    const cartItems = await this.cartService.getItemsInCart(user);
    const subTotal = cartItems
      .map((item) => item.total)
      .reduce((acc, next) => acc + next);

    // autenticando o usuário
    const authUser = await this.userRepository.findOneBy({ username: user });

    // se os usuários tiverem um pedido pendente - adicione o item à lista de pedidos
    const cart = await cartItems.map((item) => item.item);

    if (userOrder.length === 0) {
      const newOrder = await this.orderRepository.create({
        subTotal,
      });
      newOrder.items = cart;
      newOrder.user = authUser;
      return await this.orderRepository.save(newOrder);
    } else {
      const existingOrder = userOrder.map((item) => item);
      await this.orderRepository.update(existingOrder[0].id, {
        subTotal: existingOrder[0].subTotal + cart[0].price,
      });
      return { message: 'Order modified' };
    }
  }
  async getOrders(user: string): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({ relations: ['user'] });
    return orders.filter((order) => order.user?.username === user);
  }
}
