import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PeliculaEntity } from './pelicula.entity';
import { Repository, FindManyOptions } from 'typeorm';
import { ProductoraEntity } from 'productora/productora.entity';
import { PeliculaDto } from './pelicuta.dto';

@Injectable()
export class PeliculaService{
    constructor(@InjectRepository(PeliculaEntity)
    private readonly _peliculaRepository: Repository<PeliculaEntity>,
                @InjectRepository(ProductoraEntity)
                private readonly _productoraRepository: Repository<ProductoraEntity>){}

    async crear(pelicula): Promise<PeliculaDto>{
        pelicula.productora = await this._productoraRepository.findOne({nombre: pelicula.productora});
        return  await this._peliculaRepository.save(pelicula);
    }

    async encontrarUno(id: number): Promise<PeliculaDto>{
        return await this._peliculaRepository.findOne(id, {relations: ['productora']});
    }

    async encontrarTodos( skip: number, take: number): Promise<PeliculaDto[]>{
        const opciones: FindManyOptions = {
            where: {activo: true},
            relations: ['productora'],
            order: { id: 'DESC'},
            skip,
            take,
        };
        return await this._peliculaRepository.find(opciones);
    }

    async editar(id: number, actualizaciones): Promise<{mensaje: string}>{
        const resultado = await this._peliculaRepository.update(id, actualizaciones);
        const seEdito = resultado.raw.changedRows > 0;
        if (seEdito)
            return {mensaje: 'se edito correctamente'};
        else
            return {mensaje: 'no hubo cambios'};
    }

    async borrar(id: number){
        return await this._peliculaRepository.delete(id);
    }

    async buscar(palabraBusqueda: string, skip: number, take: number): Promise<PeliculaDto[]>{
        const productos = await  this._peliculaRepository
            .createQueryBuilder('pelicula')
            .where('upper(pelicula.nombre) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
            .orWhere('upper(pelicula.genero) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
            .offset(skip)
            .limit(take)
            .getMany();

        return productos;
    }

    async contarTodos(){
        return await this._peliculaRepository.count();
    }

    async contarBuscados(palabraBusqueda: string){
        return (await this._peliculaRepository
            .createQueryBuilder('pelicula')
            .select('COUNT(pelicula.id)', 'count')
            .where('upper(pelicula.nombre) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
            .orWhere('upper(pelicula.genero) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
            .getRawOne()
            ).count;
    }

    async activarDesactivar(id: number): Promise<{activo: boolean}>{
        const pelicula = await this._peliculaRepository.findOne(id);
        const resultado = await this._peliculaRepository.update(id, {
            activo: !pelicula.activo,
        });

        return {activo: !pelicula.activo};
    }
}