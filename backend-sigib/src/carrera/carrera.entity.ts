import {
    Column,
    CreateDateColumn, Entity, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {EstudianteEntity} from '../estudiante/estudiante.entity';
import {MateriaEntity} from '../materia/materia.entity';

@Entity('carrera')
export class CarreraEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    createdA?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({
        type: 'varchar',
        name: 'codigo_carrera',
        length: 2,
    })
    codigo: string = null;

    @Column({
        type: 'varchar',
        name: 'nombre',
        length: 25,
    })
    nombre: string = null;

    @Column({
        type: 'int',
        name: 'duracion',
    })
    duracion: number = null;

    @OneToMany(
        type => EstudianteEntity,
        estudiante => estudiante.carrera,
    )
    estudiante: EstudianteEntity[];

    @OneToMany(
        type => MateriaEntity,
        materia => materia.carrera,
    )
    materia: MateriaEntity[];

}
