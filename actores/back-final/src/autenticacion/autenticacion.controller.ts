import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { LoginDto, CorreoDto } from './login.dto';
import { ValidacionPipe } from 'pipe/validacion.pipe';
import { UsuarioEntity } from 'usuario/usuario.entity';
import { UsuarioService } from 'usuario/usuario.service';

@Controller('autenticacion')
export class AutenticacionController{
    constructor(private readonly _usuarioService: UsuarioService){}

    @Post('logear')
    async logear(@Body(new ValidacionPipe()) usuario: LoginDto): Promise<UsuarioEntity>{

        const usuarioVerificado = await this._usuarioService.verificarUsuario(usuario.correo, usuario.password);
        if (usuarioVerificado){
            return usuarioVerificado;
        }else {
            throw  new NotFoundException('Usuario no existe' , 'Correo o password incorrectos');
        }

    }

    @Post('existeCorreo')
    async existeUsuario(@Body(new ValidacionPipe())correo: CorreoDto): Promise<{existe: boolean}>{
        const usuario = await this._usuarioService.existeCorreo(correo.correo);
        if (usuario)
            return {existe: true};
        else
            return {existe: false};

    }

}