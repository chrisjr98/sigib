import {
    Column,
    CreateDateColumn, Entity, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {EstudianteEntity} from '../estudiante/estudiante.entity';
import {CursoEntity} from '../curso/curso.entity';

@Entity('registro_asistencia')
export class RegistroAsistenciaEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    createdA?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({
        type: 'int',
        name: 'horas_asistidas',
    })
    horasAsistidas: number = null;

    @ManyToOne(
        type => EstudianteEntity,
        estudiante => estudiante.registroAsistencia,
    )
    estudiante: EstudianteEntity | string | number;

    @ManyToOne(
        type => CursoEntity,
        curso => curso.registroAsistencia,
    )
    curso: CursoEntity | string | number;
}
