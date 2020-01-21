import { IsString, IsNumber, Length, IsInt, IsOptional } from 'class-validator';
import { ProductoraDto } from 'productora/productora.dto';

export class PeliculaDto{
    id?: number;

    @IsString()
    nombre: string;

    @IsInt()
    anioProduccion: number;

    @IsString()
    genero: string;

    @IsNumber()
    taquilla: number;

    @IsInt()
    rating: number;

    @IsInt()
    premios: number;

    productora?: ProductoraDto;

    activo?: boolean;
}

export class ActualizacionPeliculaDto {
    @IsOptional()
    @IsNumber()
    taquilla: number;

    @IsOptional()
    @IsInt()
    rating: number;

    @IsOptional()
    @IsInt()
    premios: number;

}