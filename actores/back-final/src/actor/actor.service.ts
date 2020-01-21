import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Brackets } from 'typeorm';
import { ActorEntity } from './actor.entity';
import { PeliculaEntity } from 'pelicula/pelicula.entity';

@Injectable()
export class ActorService {
    constructor(@InjectRepository(ActorEntity)
    private readonly _actorRepository: Repository<ActorEntity>,
                @InjectRepository(PeliculaEntity)
        private readonly _peliculaRepository: Repository<PeliculaEntity>) { }

    async crear(actor): Promise<ActorEntity> {
        return await this._actorRepository.save(actor);
    }

    async encontrarUno(id: number): Promise<ActorEntity> {
        return await this._actorRepository.findOne(id, {
            relations: ['pelicula'],
        });
    }

    async encontrarTodos(skip: number, take: number, idPelicula: number): Promise<ActorEntity[]> {

        const pelicula = this._peliculaRepository.findOne(idPelicula);
        const opciones: FindManyOptions = {
            relations: ['pelicula'],
            skip,
            take,
            order: { id: 'DESC' },
            where: { pelicula },
        };
        return await this._actorRepository.find(opciones);
    }

    async editar(id: number, actualizaciones): Promise<boolean> {
        const resultado = await this._actorRepository.update(id, actualizaciones);
        return resultado.raw.changedRows > 0;
    }

    async buscar(palabraBusqueda: string, skip: number, take: number, idPelicula: number): Promise<ActorEntity[]> {
        return await this._actorRepository
            .createQueryBuilder('actor')
            .leftJoinAndSelect('actor.pelicula', 'pelicula')
            .where('pelicula.id = :id', {id: idPelicula})
            .andWhere(new Brackets(qb => {
                qb.where('upper(actor.nombre) like :nombre', { nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
                .orWhere('upper(actor.pais) like :nombre', { nombre: '%' + palabraBusqueda.toUpperCase() + '%' });
            }))
            .orderBy('actor.id', 'DESC')
            .limit(take)
            .offset(skip)
            .getMany();

    }

    async contarBusqueda(palabraBusqueda, idPelicula: number): Promise<number> {
        return (await this._actorRepository
            .createQueryBuilder('actor')
            .leftJoinAndSelect('actor.pelicula', 'pelicula')
            .select('COUNT(actor.id)', 'count')
            .where('pelicula.id = :id', {id: idPelicula})
            .andWhere(new Brackets(qb => {
                qb.where('upper(actor.nombre) like :nombre', { nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
                .orWhere('upper(actor.pais) like :nombre', { nombre: '%' + palabraBusqueda.toUpperCase() + '%' });
            }))
            .orWhere('upper(actor.pais) like :nombre', { nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
            .getRawOne()).count;

    }

    async contarTodos(idPelicula: number): Promise<number> {
        const pelicula = this._peliculaRepository.findOne(idPelicula);
        return await this._actorRepository.count();
    }

    async activarDesactivar(id: number): Promise<boolean> {
        const pelicula = await this.encontrarUno(id);

        if (pelicula){
            const resultado = await this._actorRepository.update(id, { activo: !pelicula.activo });
            return !pelicula.activo;
        }else
            throw new NotFoundException('no hay pelicula para ese id');
    }

}