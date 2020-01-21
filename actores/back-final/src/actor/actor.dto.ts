import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { PeliculaDto } from 'pelicula/pelicuta.dto';

export class ActorDto{
    @IsString()
    nombre: string;

    @IsString()
    sexo: string;

    @IsString()
    pais: string;

    @IsNumber()
    nominaciones: number;

    @IsNumber()
    premios: number;

    @IsNumber()
    @IsOptional()
    id?: number;

    @IsOptional()
    @IsBoolean()
    activo?: boolean;

    pelicula?: PeliculaDto;
}

export class ActualizacionesActorDto{

    @IsOptional()
    @IsNumber()
    nominaciones: number;

    @IsOptional()
    @IsNumber()
    premios: number;

    @IsOptional()
    @IsBoolean()
    activo?: boolean;

}