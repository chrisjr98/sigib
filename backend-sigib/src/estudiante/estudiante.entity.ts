import {
    Column,
    CreateDateColumn, Entity, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {CarreraEntity} from '../carrera/carrera.entity';
import {RegistroAsistenciaEntity} from '../registro-asistencia/registro-asistencia.entity';
import {RegistroNotaEntity} from '../registro-nota/registro-nota.entity';
import {MatriculaEntity} from '../matricula/matricula.entity';

@Entity('estudiante')
export class EstudianteEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    createdA?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({
        type: 'varchar',
        name: 'codigo',
        length: 5,
    })
    codigo: string = null;

    @Column({
        type: 'varchar',
        name: 'cedula',
        length: 10,
        unique: true,
    })
    cedula: string = null;

    @Column({
        type: 'varchar',
        name: 'nombre',
        length: 100,
        nullable: true,
    })
    nombre?: string = null;

    @Column({
        type: 'varchar',
        name: 'apellido',
        length: 100,
    })
    apellido: string = null;

    @Column({
        type: 'varchar',
        name: 'telefono',
        length: 10,
    })
    telefono: string = null;

    @Column({
        type: 'varchar',
        name: 'correo',
        length: 50,
    })
    correo: string = null;

    @OneToMany(
        type => RegistroAsistenciaEntity,
        registroAsistencia => registroAsistencia.estudiante,
    )
    registroAsistencia: RegistroAsistenciaEntity[];

    @OneToMany(
        type => RegistroNotaEntity,
        registroNota => registroNota.estudiante,
    )
    registroNota: RegistroNotaEntity[];

    @OneToMany(
        type => MatriculaEntity,
        matricula => matricula.estudiante,
    )
    matricula: MatriculaEntity[];

    @ManyToOne(
        type => CarreraEntity,
        carrera => carrera.estudiante,
    )
    carrera: CarreraEntity | string | number;
}
