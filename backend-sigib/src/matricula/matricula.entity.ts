import {
    Column,
    CreateDateColumn, Entity, Index, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {EstudianteEntity} from '../estudiante/estudiante.entity';
import {CursoEntity} from '../curso/curso.entity';

@Entity('matricula')
@Index(['estudiante', 'curso'], { unique: true })
export class MatriculaEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    createdA?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @ManyToOne(
        type => EstudianteEntity,
        estudiante => estudiante.matricula,
    )
    estudiante: EstudianteEntity | string | number;

    @ManyToOne(
        type => CursoEntity,
        curso => curso.matricula,
    )
    curso: CursoEntity | string | number;

}
