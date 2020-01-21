import { IsString, IsDate, IsAlpha, IsOptional, IsBoolean } from 'class-validator';

export class ProductoraDto{
    @IsString()
    nombre: string;

    @IsString()
    fechaFundacion: string;

    @IsString()
    propietario: string;

    @IsString()
    fundador: string;

    @IsString()
    pais: string;

    @IsBoolean()
    @IsOptional()
    activo: boolean;

    @IsString()
    @IsOptional()
    rutaImagen: string;
}

export class ActualizacionesProdcutoraDto{

    @IsOptional()
    @IsString()
    fundador: string;

    @IsString()
    @IsOptional()
    rutaImagen: string;

}