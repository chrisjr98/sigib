import {
    CreateDateColumn, Entity, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {EstudianteEntity} from '../estudiante/estudiante.entity';
import {CursoEntity} from '../curso/curso.entity';

@Entity('registro_nota')
export class RegistroNotaEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    createdA?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @ManyToOne(
        type => EstudianteEntity,
        estudiante => estudiante.registroNota,
    )
    estudiante: EstudianteEntity | string | number;

    @ManyToOne(
        type => CursoEntity,
        curso => curso.registroNota,
    )
    curso: CursoEntity | string | number;

}
