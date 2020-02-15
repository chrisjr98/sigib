import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {UsuarioEntity} from '../usuario/usuario.entity';

@Entity('rol')
export class RolEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'varchar',
    name: 'codigo',
  })
  codigo: string = null;

  @Column({
    type: 'text',
    name: 'nombre',
  })
  nombre: string = null;

  @OneToMany(
      type => UsuarioEntity,
      usuario => usuario.rol,
  )
  usuario: UsuarioEntity[];
}
