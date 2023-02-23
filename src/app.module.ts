import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { ProductModule } from './modules/product.module';
import { CartModule } from './modules/cart.module';
import { OrderModule } from './modules/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'shoppingDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    ProductModule,
    CartModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
