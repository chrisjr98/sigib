import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from 'usuario/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioDto, MensajeDto, UsuarioOpciones } from './usuario.dto';

@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(UsuarioEntity)
    private readonly _usuarioRepository: Repository<UsuarioEntity>) { }

    async verificarUsuario(correo, password): Promise<UsuarioEntity> {
        return await this._usuarioRepository.findOne({where: { correo, password }});
    }

    async encontrarUno(id: number): Promise<UsuarioEntity> {
        return await this._usuarioRepository.findOne(id);
    }

    async existeCorreo(correo): Promise<UsuarioEntity>{
        return await  this._usuarioRepository.findOne({correo});
    }

    async resetearPassword(correo: string): Promise<boolean>{
        const password = '1234'; // randomize('Aa0',8);
        const usuario = await this._usuarioRepository.findOne({
            where: {
                correo,
            },
        });
        return (await this._usuarioRepository.update(usuario.id, {password})).raw.changedRows > 0;
    }

    async crear(usuario: UsuarioDto): Promise<UsuarioDto>{
        if (!usuario.password){
            usuario.password = '1234'; // randomize('Aa0', 8);
        }
        return  await this._usuarioRepository.save(usuario);

    }

    async encontrarTodos(skip: number, take: number): Promise<UsuarioEntity[]>{
        return await this._usuarioRepository.find(
            {
                order: { id: 'DESC'},
                skip,
                take,
            });
    }

    async editar(id: number, actualizaciones: UsuarioOpciones): Promise<boolean>{
        return (await this._usuarioRepository.update(id, actualizaciones)).raw.changedRows > 0;
    }

    async borrar(id: number): Promise<boolean>{
        return (await this._usuarioRepository.delete(id)).raw.affectedRows > 0;
    }

    async buscar(palabraBusqueda: string, skip, take): Promise<UsuarioEntity[]>{
        return await  this._usuarioRepository
            .createQueryBuilder('usuario')
            .where('upper(usuario.nombres) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
            .orWhere('upper(usuario.correo) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
            .orWhere('upper(usuario.apellidos) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
            .limit(take)
            .offset(skip)
            .orderBy('id', 'DESC')
            .getMany();

    }

    async contarBuscados(palabraBusqueda: string): Promise<number>{
        return (await  this._usuarioRepository
            .createQueryBuilder('usuario')
            .select('count(usuario.id)', 'count')
            .where('upper(usuario.nombres) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
            .orWhere('upper(usuario.correo) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
            .orWhere('upper(usuario.nick) like :nombre', {nombre: '%' + palabraBusqueda.toUpperCase() + '%' })
            .getRawOne()).count;

    }

    async contarTodos(): Promise<number> {
        return await this._usuarioRepository.count();
    }

    async activarDesactivar(id: number): Promise<boolean> {
        const user = await this.encontrarUno(id);

        const resultado = await this._usuarioRepository.update(id, {activo: !user.activo});
        return !user.activo;
    }
}