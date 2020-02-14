import {
    Column,
    CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {RolEntity} from '../rol/rol.entity';
import {ProfesorEntity} from '../profesor/profesor.entity';
import {EstudianteEntity} from '../estudiante/estudiante.entity';

@Entity('usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    createdA?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({
        type: 'varchar',
        name: 'cedula',
        length: 10,
    })
    cedula: string = null;

    @Column({
        type: 'varchar',
        name: 'contrasenia',
        length: 20,
    })
    contrasenia: string = null;

    @ManyToOne(
        type => RolEntity,
        rol => rol.usuario,
    )
    rol: RolEntity | string | number;

    @OneToOne(
        type => ProfesorEntity,
        profesor => profesor.usuario,
    )
    @JoinColumn()
    profesor: ProfesorEntity;

    @OneToOne(
        type => EstudianteEntity,
        estudiante => estudiante.usuario,
    )
    @JoinColumn()
    estudiante: EstudianteEntity;

}
