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
