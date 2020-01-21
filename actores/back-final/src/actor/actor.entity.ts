import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ObjectIdColumn, ManyToOne } from 'typeorm';
import { PeliculaEntity } from 'pelicula/pelicula.entity';

@Entity('actor')
export class ActorEntity{

    @Column({name: 'nombre', type: 'varchar', length: 50})
    nombre: string;

    @Column({name: 'sexo', type: 'enum', enum: ['M', 'F'], default: 'M'})
    sexo: string;

    @Column({name: 'pais', type: 'varchar', length: 30})
    pais: string;

    @Column({name: 'nominaciones', type: 'int'})
    nominaciones: number;

    @Column({name: 'premios', type: 'int'})
    premios: number;

    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(type => PeliculaEntity, pelicula => pelicula.actores)
    pelicula: PeliculaEntity;

    @Column({name: 'activo', type: 'boolean', default: true})
    activo: boolean;
}