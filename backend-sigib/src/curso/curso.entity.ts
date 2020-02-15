import {
    Column,
    CreateDateColumn, Entity, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {RegistroNotaEntity} from '../registro-nota/registro-nota.entity';
import {RegistroAsistenciaEntity} from '../registro-asistencia/registro-asistencia.entity';
import {MatriculaEntity} from '../matricula/matricula.entity';
import {ProfesorEntity} from '../profesor/profesor.entity';
import {MateriaEntity} from '../materia/materia.entity';

@Entity('curso')
export class CursoEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    createdA?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({
        type: 'varchar',
        name: 'grupo',
        length: 3,
    })
    grupo: string = null;

    @Column({
        type: 'varchar',
        name: 'horario',
        length: 10,
    })
    horario: string = null;

    @Column({
        type: 'varchar',
        name: 'aula',
        length: 10,
    })
    aula: string = null;

    @Column({
        type: 'int',
        name: 'numero_max_alumnos',
    })
    numeroMaximoAlumnos: number = null;

    @Column({
        type: 'int',
        name: 'id_carrera',
    })
    idCarrera: number = null;

    @OneToMany(
        type => RegistroNotaEntity,
        registroNota => registroNota.curso,
    )
    registroNota: RegistroNotaEntity[];

    @OneToMany(
        type => RegistroAsistenciaEntity,
        registroAsistencia => registroAsistencia.curso,
    )
    registroAsistencia: RegistroAsistenciaEntity[];

    @OneToMany(
        type => MatriculaEntity,
        matricula => matricula.curso,
    )
    matricula: MatriculaEntity[];

    @ManyToOne(
        type => ProfesorEntity,
        profesor => profesor.curso,
    )
    profesor: ProfesorEntity | string | number;

    @ManyToOne(
        type => MateriaEntity,
        materia => materia.curso,
    )
    materia: MateriaEntity | string | number;

}
