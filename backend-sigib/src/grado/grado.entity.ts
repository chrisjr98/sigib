import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn
} from "typeorm";
import { EstudianteEntity } from "src/estudiante/estudiante.entity";

@Entity("grado")
export class GradoEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    createdA?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({
        type: "decimal",
        name: "notaCurriculum",
        precision: 10,
        scale: 2
    })
    notaCurriculum: number = null;

    @Column({
        type: "decimal",
        name: "notaProyecto",
        precision: 10,
        scale: 2
    })
    notaProyecto: number = null;

    @Column({
        type: "decimal",
        name: "notaGrado",
        precision: 10,
        scale: 2
    })
    notaGrado: number = null;

    @OneToOne(type => EstudianteEntity, estudiante => estudiante.grado)
    @JoinColumn()
    estudiante: EstudianteEntity;
}
