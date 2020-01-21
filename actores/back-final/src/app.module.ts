import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { UsuarioService } from 'usuario/usuario.service';
import { UsuarioEntity } from 'usuario/usuario.entity';
import { AutenticacionController } from 'autenticacion/autenticacion.controller';
import { UsuarioController } from 'usuario/usuario.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductoraEntity } from 'productora/productora.entity';
import { ProductoraService } from 'productora/productora.service';
import { ProductoraResolver } from 'productora/productora.resolver';
import { WebsocketModule } from 'websocket/websocket.module';
import { ActorController } from 'actor/actor.controller';
import { ActorService } from 'actor/actor.service';
import { ActorEntity } from 'actor/actor.entity';
import { PeliculaService } from 'pelicula/pelicula.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '12345678',
      database: 'base-pelicula',
      // dropSchema: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      UsuarioEntity,
      ProductoraEntity,
      ActorEntity,
    ]),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    WebsocketModule,
  ],
  controllers: [
    AppController,
    AutenticacionController,
    UsuarioController,
    ActorController,
  ],
  providers: [
    AppService,
    UsuarioService,
    ProductoraService,
    ProductoraResolver,
    ActorService,
    PeliculaService,
  ],
})
export class AppModule {}
