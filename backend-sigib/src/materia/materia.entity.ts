import {
    Column,
    CreateDateColumn, Entity, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {CursoEntity} from '../curso/curso.entity';
import {CarreraEntity} from '../carrera/carrera.entity';

@Entity('materia')
export class MateriaEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    createdA?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({
        type: 'varchar',
        name: 'codigo',
        length: 3,
    })
    codigo: string = null;

    @Column({
        type: 'varchar',
        name: 'nombre',
        length: 60,
    })
    nombre: string = null;

    @Column({
        type: 'varchar',
        name: 'anio',
        length: 10,
    })
    anio: string = null;

    @Column({
        type: 'varchar',
        name: 'tipo_materia',
        length: 15,
    })
    tipoMateria: string = null;

    @OneToMany(
        type => CursoEntity,
        curso => curso.materia,
    )
    curso: CursoEntity[];

    @ManyToOne(
        type => CarreraEntity,
        carrera => carrera.materia,
    )
    carrera: CarreraEntity | string | number;
}
