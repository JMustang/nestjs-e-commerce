import { ProductsService } from './products.service';
import { Users } from '../models/user.model';
import { CartModel } from '../models/cart.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartModel)
    private cartRepository: Repository<CartModel>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private productsService: ProductsService,
  ) {}
  async addToCart(
    productId: number,
    quantity: number,
    user: string,
  ): Promise<any> {
    const cartItems = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    const product = await this.productsService.getOne(productId);
    const authUser = await this.usersRepository.findOneBy({ username: user });

    // Checando se o item existe!
    if (product) {
      // Confirmando se o cliente tem o item no carrinho
      const cart = cartItems.filter(
        (item) => item.item.id === productId && item.user.username === user,
      );
      if (cart.length < 1) {
        const newItem = this.cartRepository.create({
          total: product.price * quantity,
          quantity,
        });
        newItem.user = authUser;
        newItem.item = product;
        this.cartRepository.save(newItem);

        return await this.cartRepository.save(newItem);
      } else {
        // Atualizando a quantidade de itens
        const quantity = (cart[0].quantity += 1);
        const total = cart[0].total * quantity;

        return await this.cartRepository.update(cart[0].id, {
          quantity,
          total,
        });
      }
    }
    return null;
  }

  async getItemsInCart(user: string): Promise<CartModel[]> {
    const userCart = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    return (await userCart).filter((item) => item.user.username === user);
  }
}
