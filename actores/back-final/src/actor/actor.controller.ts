import { Controller, Get, Post, Put, Query, Param, NotFoundException, Body, BadRequestException, ParseIntPipe, UsePipes } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorEntity } from './actor.entity';
import { ValidacionPipe } from 'pipe/validacion.pipe';
import { ActorDto, ActualizacionesActorDto } from './actor.dto';
import { PeliculaService } from 'pelicula/pelicula.service';

@Controller('actor')
export class ActorController{
    constructor(private readonly _actorService: ActorService,
                private readonly _peliculaService: PeliculaService){}

    @Get()
    async buscarTodos(@Query('skip', new ParseIntPipe())skip: number,
                      @Query('take', new ParseIntPipe())take: number,
                      @Query('idPelicula', new ParseIntPipe())idPelicula){
        return await this._actorService.encontrarTodos(skip, take, idPelicula);
    }

    @Get('encontrarUno/:id')
    buscarUno(@Param('id', ParseIntPipe) id: number): Promise<ActorEntity>{
        const user = this._actorService.encontrarUno(id);
        if (user)
            return user;
        else
            throw new NotFoundException('no se hallo resultado');
    }

    @Post('crear')
    async crear(@Body(new ValidacionPipe()) actor: ActorDto): Promise<ActorDto>{
        actor.pelicula = await this._peliculaService.encontrarUno(+actor.pelicula);
        const actorCreated: any = this._actorService.crear(actor);
        if (actorCreated.mensaje)
            throw new BadRequestException(actorCreated.mensaje);
        else
            return actorCreated;
    }

    @Put('actualizar')
    actualizar(@Body('id') id: number,
               @Body('actualizaciones', new ValidacionPipe()) actualizaciones: ActualizacionesActorDto): {mensaje: string}{
        const fueEditado = this._actorService.editar(id, actualizaciones);
        if (fueEditado){
            return {mensaje: 'editado Correctamente'};
        }else
            return {mensaje: 'no hubo cambios'};

    }

    @Post('buscar')
    async buscar(@Body('patron')patron,
                 @Body('skip')skip: number,
                 @Body('take')take: number,
                 @Body('idPelicula') idPelicula): Promise<ActorEntity[]>{
        const usuarios: any = await this._actorService.buscar(patron, skip, take, idPelicula);
        if (usuarios.length > 0)
            return usuarios;
        else
            throw  new NotFoundException('no se hallaron resultados');
    }

    @Get('contarTodos')
    @UsePipes(ValidacionPipe)
    async contarTodos(@Query('idPelicula', new ParseIntPipe()) idPelicula): Promise<number>{
        return await this._actorService.contarTodos(idPelicula);
    }

    @Get('contarBuscados')
    async contarBuscados(@Query('patron')patron: string,
                         @Query('idPelicula', new ParseIntPipe()) idPelicula: string): Promise<number>{
        return await this._actorService.contarBusqueda(patron, +idPelicula);
    }

    @Post('activarDesactivar')
    @UsePipes(ValidacionPipe)
    activarDesactivar(@Body('id') id: number) {
        return this._actorService.activarDesactivar(id);
    }
}