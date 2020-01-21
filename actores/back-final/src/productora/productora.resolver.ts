import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductoraService } from './productora.service';
import { ValidacionPipe } from 'pipe/validacion.pipe';
import { ProductoraDto, ActualizacionesProdcutoraDto } from './productora.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver('propietario')
export class ProductoraResolver {

    constructor(private readonly _productoraService: ProductoraService) { }

    @Query('encontrarTodasProductoras')
    encontrarTodasProductoras(@Args('skip') skip: number,
                              @Args('take') take: number): Promise<ProductoraDto[]> {
        return this._productoraService.encontrarTodos(skip, take);
    }

    @Mutation('crearProductora')
    crearProductora(@Args('productora',
                          new ValidacionPipe())
                          productora: ProductoraDto): Promise<ProductoraDto> {
        return this._productoraService.crear(productora);
    }

    @Mutation('editarProductora')
    editarProductora(@Args('id') id,
                     @Args('actualizaciones', new ValidacionPipe()) actualizaciones: ActualizacionesProdcutoraDto): { mensaje: string } {
        const seEdito = this._productoraService.editar(id, actualizaciones);
        if (seEdito)
            return { mensaje: 'editado correctamente' };
        else
            return { mensaje: 'no se edito' };
    }

    @Query('encontrarUnaProductora')
    encontrarUnaProductora(@Args('id') id): Promise<ProductoraDto> {
        return this._productoraService.encontrarUno(id);
    }

    @Mutation('activarDesactivarProductora')
    async activarDesactivarProductora(@Args('id') id): Promise<{activo: boolean}> {
        return {
            activo: await this._productoraService.activarDesactivar(id),
            };
    }

    @Query('buscarProductora')
    buscarProductoras(@Args('palabraBusqueda') palabraBusqueda,
                      @Args('skip') skip,
                      @Args('take') take): Promise<ProductoraDto[]> {
        return this._productoraService.buscar(
            palabraBusqueda,
            skip,
            take);
    }

    @Query('contarProductorasBuscadas')
    contarBuscadas(@Args('palabraBusqueda') palabraBuscada: string): Promise<number> {
        return this._productoraService.contarBusqueda(palabraBuscada);
    }

    @Query('contarProductoras')
    contarTodas(): Promise<number> {
        return this._productoraService.contarTodos();
    }

}