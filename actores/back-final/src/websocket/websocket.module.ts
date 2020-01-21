import { Module } from '@nestjs/common';
import { PeliculaGateway } from './pelicula/pelicula.gateway';
import { PeliculaService } from 'pelicula/pelicula.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeliculaEntity } from 'pelicula/pelicula.entity';
import { ProductoraEntity } from 'productora/productora.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PeliculaEntity,
            ProductoraEntity,
        ]),
    ],
    providers: [
        PeliculaGateway,
        PeliculaService,
    ],

})
export class WebsocketModule{

}
