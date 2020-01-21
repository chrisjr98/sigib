import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ProductoraEntity } from 'productora/productora.entity';
import { ActorEntity } from 'actor/actor.entity';

@Entity('pelicula')
export class PeliculaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'nombre', type: 'varchar'})
    nombre: string;

    @ManyToOne( type => ProductoraEntity, productora => productora.peliculas)
    productora: ProductoraEntity;

    @OneToMany( type => ActorEntity, actor => actor.pelicula)
    actores: ActorEntity[];

    @Column({ name: 'anioProduccion', type: 'int'})
    anioProduccion: number;

    @Column({ name: 'genero', type: 'varchar'})
    genero: string;

    @Column({ name: 'taquilla', type: 'double precision', default: 30.0})
    taquilla: number;

    @Column({ name: 'rating', type: 'enum', enum: [ 0, 1, 2, 3, 4, 5]})
    rating: number;

    @Column({ name: 'premios', type: 'int'})
    premios: number;

    @Column({ name: 'activo', default: true})
    activo: boolean;
}