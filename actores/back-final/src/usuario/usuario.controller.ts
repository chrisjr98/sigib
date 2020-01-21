import { Controller, Post, Body, Query, Get, Param, NotFoundException, BadRequestException, Put, UsePipes, UseInterceptors, FileInterceptor, UploadedFile } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { ValidacionPipe } from 'pipe/validacion.pipe';
import { CorreoDto } from 'autenticacion/login.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioDto, UsuarioOpciones, MensajeDto } from './usuario.dto';
import { AwaitableNode } from 'ts-simple-ast';
import { localEnvironment } from 'local-environment';
import { storage } from 'opciones-multer';

@Controller('usuario')
export class UsuarioController{
    constructor(private readonly _usuarioService: UsuarioService){}

    @Post('resetear-password')
    async resetearPassword(@Body( new ValidacionPipe()) correo: CorreoDto): Promise<{mensaje: string}>{
        const reseteado = await this._usuarioService.resetearPassword(correo.correo);
        if (reseteado)
            return {mensaje: 'reseteado correctamente'};
        else
            return {mensaje: 'no hubo cambios'};
    }

    @Get()
    async buscarTodos(@Query('skip')skip: number, @Query('take')take: number){
        return await this._usuarioService.encontrarTodos(skip, take);
    }

    @Get('encontrarUno/:id')
    async buscarUno(@Param('id') id: number): Promise<UsuarioEntity>{
        const user = await this._usuarioService.encontrarUno(id);
        if (user)
            return user;
        else
            throw new NotFoundException('no se hallo resultado');
    }

    @Post('crear')
    async crear(@Body(new ValidacionPipe()) usuario: UsuarioDto): Promise<UsuarioDto>{
        const userCreated: any = await this._usuarioService.crear(usuario);
        if (userCreated.mensaje)
            throw new BadRequestException(userCreated.mensaje);
        else
            return userCreated;
    }

    @Put('actualizar')
    async actualizar(@Body('id') id: number,
                     @Body() actualizaciones: UsuarioOpciones): Promise<MensajeDto>{
        const fueEditado = await this._usuarioService.editar(id, actualizaciones);
        if (fueEditado){
            return {mensaje: 'editado Correctamente'};
        }else
            return {mensaje: 'no hubo cambios'};

    }

    @Post('borrar')
    async borrar(@Body('id') id: number): Promise<MensajeDto>{
        const borrado = await this._usuarioService.borrar(id);
        if (borrado)
            return {mensaje: 'borrado correctamente'};
        else
            return {mensaje: 'no se borro'};
    }

    @Post('buscar')
    async buscar(@Body('patron')patron, @Body('skip')skip, @Body('take')take: number): Promise<UsuarioEntity[]>{
        const usuarios: any = await this._usuarioService.buscar(patron, skip, take);
        if (usuarios.length > 0)
            return usuarios;
        else
            throw  new NotFoundException('no se hallaron resultados');
    }

    @Get('contarTodos')
    async contarTodos(){
        return await this._usuarioService.contarTodos();
    }

    @Get('contarBuscados')
    async contarBuscados(@Query('palabraBuscada') palabraBuscada){
        return await this._usuarioService.contarBuscados(palabraBuscada);
    }

    @Post('activarDesactivar')
    async activarDesactivar(@Body('id') id){
        return await this._usuarioService.activarDesactivar(id);
    }

    @Post('subirFoto')
    @UseInterceptors(FileInterceptor('file', {
      storage,
    }))
    uploadFile(@UploadedFile() file, @Query('id') id: number) {
      console.log(file);
      const rutaImagen = localEnvironment.urlServer + '/' + file.filename;
      this._usuarioService.editar(+id, { rutaImagen});
  
    }
}