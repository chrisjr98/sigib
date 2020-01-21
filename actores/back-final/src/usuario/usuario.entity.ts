import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuario')
export class UsuarioEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'nombres', type: 'varchar', length: 30})
    nombres: string;

    @Column({name: 'apellidos', type: 'varchar', length: 30})
    apellidos: string;

    @Column({name: 'nick', type: 'varchar', length: 30})
    nick: string;

    @Column({name: 'password', type: 'varchar', length: 25, default: '1234'})
    password: string;

    @Column({name: 'rol', type: 'enum', enum: ['admin', 'normal'], default: 'admin'})
    rol: string;

    @Column({name: 'correo', type: 'varchar', length: 30, unique: true})
    correo: string;

    @Column({name: 'direccion', type: 'varchar', length: 30})
    direccion: string;

    @Column({name: 'activo', type: 'boolean', default: true})
    activo: boolean;

    @Column({name: 'rutaImagen', type: 'varchar',
    length: 150, default: 'http://localhost:3000/gato.jpg'})
    rutaImagen: string;
}