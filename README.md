<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# configurando o projeto

- Para começar a usar o Nestjs, instale a CLI do Nestjs com o comando abaixo:

```bash
npm i -g @nestjs/cli
```

- Terminada a instalação, crie um projeto Nestjs com o comando abaixo:

```bash
nest new nomeProjeto
```

- Escolha o **npm** como gerenciador de pacotes, aperte o botão enter e espere o Nest instalar os pacotes necessários para executar este aplicativo.

- Terminada a instalação, altere o diretório para a pasta do projeto com o comando abaixo:

```bash
cd nomeProjeto
```

- Em seguida, abra o diretório do projeto em seu editor de texto ou IDE favorito, abra um novo terminal e execute o servidor em modo de desenvolvimento (isso habilitará o hot reload e nos permitirá ver possíveis erros no console) com o comando abaixo:

```bash
npm run start:dev
```

# Instalar dependências

- Com o servidor instalado e funcionando, abra uma nova janela de terminal para não sair do servidor. Isso permitirá que você veja o efeito das alterações feitas na base de código ao longo deste tutorial.

- Agora instale as seguintes dependências:

  1.Passport
  2.Passport-local
  3.Jwt
  4.Passport-jwt
  5.SQLIte3
  6.TypeORM
  7.Bcrypt

- Você pode fazer isso com o comando abaixo:

```bash
npm install --save @nestjs/passport passport passport-local @nestjs/jwt passport-jwt @nestjs/typeorm typeorm sqlite3 bcrypt
```

Em seguida, instale as dependências dev com o comando abaixo:

```bash
npm install --save-dev @types/passport-local @types/passport-jwt @types/bcrypt
```

Você pode tomar uma xícara de café enquanto o npm instala os pacotes. Assim que a instalação estiver concluída, vamos colocar a mão na massa.

# Criar módulos de aplicativo

- Com todos os pacotes necessários para executar o aplicativo, vamos prosseguir para a criação dos módulos do aplicativo. Para criar um aplicativo limpo e de fácil manutenção, você gerará módulos separados para todos os recursos implementados nesse aplicativo. Como este é um aplicativo de comércio eletrônico, você terá autenticação, carrinho, produtos e pedidos. Todos estes estarão em seus próprios módulos separados. Vamos começar com o módulo de autenticação.

## Criar módulo de autenticação

- Gere um módulo de autenticação com o comando abaixo:

```bash
nest g module auth
```

- O comando acima cria uma pasta **auth** no diretório **src** do projeto com os templates necessários e registra o módulo no módulo raiz do projeto (arquivo app.module.ts).

- Em seguida, crie os módulos **product, cart, order**, com o comando abaixo:

```bash
#Create a product module
nest g module product

#Create cart module
nest g module cart

#Create cart module
nest g module order
```

Os comandos acima criará uma pasta **product, cart e order** na pasta **src** do projeto com os templetes básicos e registrará esses módulos no módulo app raiz do projeto.

# Configurando bancos de dados TypeORM e SQLite

- Com os módulos de aplicativo instalados, configure o **TypeORM** para conectar seu aplicativo ao banco de dados **SQLite** e criar suas entidades de módulo. Para começar, abra o **app.module.ts** e configure seu banco de dados **SQLite** com os trechos de código abaixo:

```typescript
imports: [
 …
 TypeOrmModule.forRoot({
   type :"sqlite",
   database: "shoppingDB",
   entities: [__dirname + "/**/*.entity{.ts,.js}"],
   synchronize: true
 })
],
…
```

- No trecho de código acima, você conectou o aplicativo a um banco de dados **SQLite** usando o **TypeORM** **forRoot**, especificando o tipo de banco de dados, o nome do banco de dados e o local onde o **Nestjs** pode encontrar as entidades de modelo.

- Assim que o servidor for atualizado, você deverá ver um arquivo **shoppingDB** criado no diretório raiz deste projeto.

# Criar modelos de entidade de aplicativo

- Com a configuração do banco de dados, vamos criar os modelos de entidade para nossos módulos de aplicativo. Começaremos com o módulo **auth**. Gere um arquivo de entidade na pasta do módulo **auth** com o comando abaixo:

```bash
nest generate class auth/user.entity –flat
```

- Em seguida, adicione o trecho de código abaixo para definir as propriedades da tabela do usuário com o trecho de código abaixo:

```typescript
import {
  Entity,
  OneToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { CartEntity } from 'src/cart/cart.entity';
import { OrderEntity } from 'src/order/order.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: String;

  @UpdateDateColumn()
  updatedAt: String;

  @OneToMany((type) => CartEntity, (cart) => cart.id)
  @JoinColumn()
  cart: CartEntity[];

  @OneToOne((type) => OrderEntity, (order) => order.id)
  @JoinColumn()
  order: OrderEntity;
}
```

- No trecho de código, você importou os decoradores necessários para configurar sua tabela de banco de dados. Você também importou as classes **cartEntity** e **orderEntity** que criaremos em breve. Usando o decorador **typeorm**, definimos as propriedades do banco de dados do modelo do user. Por fim, criamos relacionamentos **OneToOne** e **OneToMany** entre a entidade **users** e **cartEntity** e **orderEntity**. Dessa forma, você pode associar um item do cart a um user. O mesmo se aplica ao pedido do user.

- A seguir, crie a classe entity product com o comando abaixo:

```bash
nest generate class product/product.entity –flat
```

- O comando acima irá gerar um arquivo **product.entity.ts** na pasta do módulo **products**.

Agora configure as propriedades da tabela de products com o trecho de código abaixo:

```typescript
import {
  Entity,
  JoinColumn,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartEntity } from 'src/cart/cart.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: string;

  @CreateDateColumn()
  createdAt: String;

  @UpdateDateColumn()
  updatedAt: String;

  @OneToMany((type) => CartEntity, (cart) => cart.id)
  @JoinColumn()
  cart: CartEntity[];
}
```

- No trecho de código acima, configuramos as propriedades da tabela **product** e criamos um relacionamento um-para-muitos com a entidade **cart**.

Em seguida crie a entidade **cart** com o comando abaixo:

```bash
nest generate class cart/cart.entity –flat
```

- O comando acima irá gerar um arquivo **cart.entity.ts** na pasta do módulo **cart**. Agora adicione o trecho de código abaixo ao arquivo que você criou para configurar as propriedades da tabela **cart**.

```typescript
import {
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from 'src/order/order.entity';
import { ProductEntity } from 'src/product/product.entity';
import { Users } from 'src/auth/user.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @ManyToOne((type) => ProductEntity, (order) => order.id)
  @JoinColumn()
  item: ProductEntity;

  @ManyToOne((type) => Users, (user) => user.username)
  @JoinColumn()
  user: Users;
}
```

- No trecho de código acima, você configurou as propriedades da tabela **cart**, criou um relacionamento muitos-para-um entre a entidade **cart** e um relacionamento muitos-para-um com a entidade do **users**.

- Por fim, crie a entidade **order** com o comando abaixo:

```bash
nest generate class order/order.entity –flat
```

- O comando acima irá gerar um arquivo **order.entity.ts** na pasta do módulo de **order**. Abra o **order.entity.ts** e configure a tabela do banco de dados com o comando abaixo:

```typescript
import {
  Entity,
  OneToMany,
  JoinColumn,
  OneToOne,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { Users } from 'src/auth/user.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToMany((type) => ProductEntity, (item) => item.id)
  items: ProductEntity[];

  @OneToOne((type) => Users, (user) => user.username)
  @JoinColumn()
  user: Users;

  @Column()
  subTotal: number;

  @Column({ default: false })
  pending: boolean;
}
```

- No trecho de código acima, você criou um relacionamento um-para-um entre a entidade **users** e um relacionamento um-para-muitos com a entidade **products**.

- Neste ponto, suas entidades de banco de dados estão configuradas e conectadas. Agora crie sua lógica de negócios para armazenar registros nessas entidades.

# Criando os serviços

- Agora crie os serviços para os módulos neste aplicativo. Aqui, você permitirá que o administrador adicione produtos à tabela de produtos, autentique usuários, permita que os usuários adicionem os produtos da loja ao carrinho e solicitem o produto por meio do carrinho.

## Criar o Auth Service

- Para criar o serviço de autenticação, execute o comando abaixo para gerar o serviço para o módulo de autenticação.

```bash
nest g service auth/service/auth --flat
```

- O comando acima irá gerar um arquivo **auth.service.ts** na pasta **src/auth/service**. Agora abra o arquivo **auth.service.ts** e adicione o trecho de código abaixo:

```typescript
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private jwt: JwtService,
  ) {}
}
```

- No trecho de código acima, você importou os módulos **InjectRepository**, **Repository** **decorator**, **JwtService** e **bcrypt**. Em seguida, usando o decorador **InjectRepository**, você disponibilizou a classe de entidade User no serviço de autenticação, fornecendo o método para realizar operações CRUD em sua entidade **User**.

- Em seguida, crie um método de inscrição para permitir que os usuários se registrem no aplicativo com o trecho de código abaixo:

```typescript
async signup(user: Users): Promise<Users> {
       const salt = await bcrypt.genSalt();
       const hash = await bcrypt.hash(user.password, salt);
       user.password = hash
       return await this.userRepository.save(user);
   }
```

- Now create the validateUser method to validate the users' details and the login method to generate a jwt token for the authenticated user.

```typescript
…
 async validateUser(username: string, password: string): Promise<any> {
       const foundUser = await this.userRepository.findOne({ username });
       if (foundUser) {
           if (await bcrypt.compare(password, foundUser.password)) {
               const { password, ...result } = foundUser
               return result;
           }

           return null;
       }
       return null

   }
   async login(user: any) {
       const payload = { username: user.username, sub: user.id, role:user.role };

       return {
           access_token: this.jwt.sign(payload),
       };
   }
```

- Agora podemos implementar nossa estratégia de autenticação local do Passport. Crie um arquivo chamado local.strategy.ts na pasta do módulo auth e adicione o seguinte código:

```typescript
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const foundUser = await this.authService.validateUser(username, password);
    if (!foundUser) {
      throw new UnauthorizedException();
    }
    return foundUser;
  }
}
```

- No trecho de código acima, você implementou uma estratégia de passaporte local. Não há opções de configuração, então nosso construtor simplesmente chama **super()** sem um objeto de opções.

- Você também implementou o método **valid()**. O **Passport** chamará a função de verificação para cada estratégia usando um conjunto de parâmetros apropriado específico da estratégia. Para a estratégia local, o **Passport** espera um método **valid()** com a seguinte assinatura: validar(nome de usuário: string, senha:string): qualquer.

- Em seguida, crie um arquivo **jwt-auth.guard.ts** na pasta do módulo **auth** e defina um **auth** **guard** personalizado com o trecho de código abaixo:

```ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
```

- Você usará o **AuthGuard** criado no trecho de código para proteger suas rotas de API de usuários não autorizados.

- Agora crie um arquivo **jwt-strategy** na pasta do módulo **auth** para autenticar usuários e gerar **tokens** **jwt** para usuários logados com o trecho de código abaixo:

```ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
```

- Em seguida, configure o módulo **jwt** no arquivo **auth.module.ts** na pasta do módulo **auth**. Antes disso, crie um arquivo **constants.ts** na mesma pasta do módulo auth para definir um **jwt** **secret** com o trecho de código abaixo:

```ts
export const jwtConstants = {
  secret: 'wjeld-djeuedw399e3-uejheuii33-4jrjjejei3-rjdjfjf',
};
```

- Você pode gerar um segredo **jwt** mais seguro na produção, mas usaremos aquele para fins de demonstração.

- Agora importe todos os módulos necessários em seu arquivo **auth.module.ts** com o trecho de código abaixo:

```ts
…
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
…
```

- Em seguida, no **array** de importações, configure o **jwt** com o trecho de código abaixo:

```ts
…
imports: [
   PassportModule,
   JwtModule.register({
     secret: jwtConstants.secret,
     signOptions: { expiresIn: '60m' },
   }),
…
```

- No trecho de código acima, adicionamos o pacote **PassModule** para permitir que o passaporte lide com a autenticação dos usuários e configure o **jwt** usando o método de registro **JwtModule**. Passamos o segredo que criamos no arquivo de constantes e especificamos o tempo de expiração do **token** gerado (você pode reduzir ou aumentar o tempo dependendo do caso de uso).
