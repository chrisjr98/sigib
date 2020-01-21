import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PeliculaEntity } from 'pelicula/pelicula.entity';

@Entity('productora')
export class ProductoraEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombre', type: 'varchar', length: 30})
    nombre: string;

    @Column({ name: 'fechaFundacion', type: 'date'})
    fechaFundacion: string;

    @Column({ name: 'pais', type: 'varchar', length: 30})
    pais: string;

    @Column({ name: 'propietario', type: 'varchar', length: 30})
    propietario: string;

    @Column({ name: 'fundador', type: 'varchar', length: 30})
    fundador: string;

    @OneToMany( type => PeliculaEntity, pelicula => pelicula.productora)
    peliculas: PeliculaEntity[];

    @Column({name: 'activo', default: true})
    activo: boolean;

    @Column({name: 'rutaImagen', type: 'varchar', default: 'http://localhost:3000/film-reel.png'})
    rutaImagen: string;
}