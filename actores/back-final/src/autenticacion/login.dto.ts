import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto{
    @IsEmail()
    correo: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class CorreoDto{
    @IsEmail()
    correo: string;
}