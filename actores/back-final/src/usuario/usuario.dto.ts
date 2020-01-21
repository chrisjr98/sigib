import {IsBoolean, IsEmail, IsOptional, IsString, IsNumber} from 'class-validator';

export class LoginDto{

    @IsEmail()
    correo: string;

    @IsString()
    password: string;
}

export class UsuarioDto {
    @IsString()
    nombres: string;

    @IsString()
    apellidos: string;

    @IsEmail()
    correo: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    rol: string;

    @IsString()
    nick: string;

    @IsString()
    direccion: string;

    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsBoolean()
    activo?: boolean;

    @IsString()
    @IsOptional()
    rutaImagen?: string;
}

export class UsuarioOpciones{

    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    nombres?: string;

    @IsOptional() @IsString()
    apellidos?: string;

    @IsEmail() @IsOptional()
    correo?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    rol?: string;

    @IsString()
    @IsOptional()
    nick?: string;

    @IsString()
    @IsOptional()
    direccion?: string;

    @IsString()
    @IsOptional()
    rutaImagen?: string;
}

export class MensajeDto{
    mensaje: string;
}