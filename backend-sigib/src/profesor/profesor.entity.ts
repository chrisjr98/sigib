import {
    Column,
    CreateDateColumn, Entity, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {CursoEntity} from '../curso/curso.entity';
import {Usuario} from '../../../frontapp-sigib/src/app/clases/usuario';
import {UsuarioEntity} from '../usuario/usuario.entity';

@Entity('profesor')
export class ProfesorEntity {
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
        unique: true,
    })
    cedula: string = null;

    @Column({
        type: 'varchar',
        name: 'nombre',
        length: 100,
    })
    nombre: string = null;

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

    @Column({
        type: 'varchar',
        name: 'tipo_contrato',
        length: 30,
    })
    tipoContrato: string = null;

    @Column({
        type: 'datetime',
        name: 'fecha_contratacion',
    })
    fechaContratacion: string | Date = null;

    @OneToMany(
        type => CursoEntity,
        curso => curso.profesor,
    )
    curso: CursoEntity[];

    @OneToOne(
        type => UsuarioEntity,
        usuario => usuario.profesor,
    )
    usuario: UsuarioEntity;

}
