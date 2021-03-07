import {
    Column,
    CreateDateColumn, Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('comprobante')
export class ComprobanteEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    createdA?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({
        type: 'int',
        name: 'numero',
    })
    numero: number = null;

    @Column({
        type: 'datetime',
        name: 'fecha',
    })
    fecha: string | Date = null;

    @Column({
        type: 'varchar',
        name: 'ci',
        length: 10,
    })
    ci: string = null;

    @Column({
        type: 'varchar',
        name: 'nombre',
        length: 100,
    })
    nombre: string = null;

    @Column({
        type: 'varchar',
        name: 'tipo',
        length: 12,
    })
    tipo: string = null;

    @Column({
        type: 'varchar',
        name: 'forma_pago',
        length: 20,
    })
    formaPago: string = null;

    @Column({
        type: 'varchar',
        name: 'realizado',
        length: 50,
    })
    realizadop: string = null;

    @Column({
        type: 'varchar',
        name: 'comprobante',
        length: 20,
    })
    comprobantep: string = null;

    @Column({
        type: 'varchar',
        name: 'beneficiario',
        length: 25,
    })
    beneficiario: string = null;

}
