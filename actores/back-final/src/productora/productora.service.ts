import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoraEntity } from './productora.entity';
import { Repository, FindManyOptions } from 'typeorm';

@Injectable()
export class ProductoraService{
    constructor(@InjectRepository(ProductoraEntity)
        private readonly _productoraRepository: Repository<ProductoraEntity>){}

        async crear(empresa): Promise<ProductoraEntity>{
            return  await this._productoraRepository.save(empresa);
        }

        async encontrarUno(id: number): Promise<ProductoraEntity>{
            return await this._productoraRepository.findOne(id);
        }

        async encontrarTodos(skip: number, take: number): Promise<ProductoraEntity[]>{
            const opciones: FindManyOptions = {
                // relations: ['productos'],
                where: {activo: true},
                skip,
                take,
                order: { id: 'DESC'}};
            return await this._productoraRepository.find(opciones);
        }

        async editar(id: number, actualizaciones): Promise<boolean>{
            const resultado = await this._productoraRepository.update(id, actualizaciones);
            return resultado.raw.changedRows > 0;
        }

        async buscar(palabraBusqueda: string, skip: number, take: number): Promise<ProductoraEntity[]>{
            return await  this._productoraRepository
                .createQueryBuilder('productora')
                .where('upper(productora.nombre) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
                .orWhere('upper(productora.propietario) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
                .orWhere('upper(productora.pais) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
                .orderBy('id', 'DESC')
                .limit(take)
                .offset(skip)
                .getMany();

        }

        async contarBusqueda(palabraBusqueda): Promise<number>{
            return (await  this._productoraRepository
                .createQueryBuilder('productora')
                .select('COUNT(productora.id)', 'count')
                .where('upper(productora.nombre) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
                .orWhere('upper(productora.propietario) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
                .getRawOne()).count;

        }

        async contarTodos(): Promise<number>{
            return await this._productoraRepository.count();
        }

        async activarDesactivar(id: number): Promise<boolean> {
            const productora = await this.encontrarUno(id);

            const resultado = await this._productoraRepository.update(id, {activo: !productora.activo});
            return !productora.activo;
        }

}