import {Injectable} from '@nestjs/common';
import {PrincipalService} from '../principal/principal.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UsuarioEntity} from './usuario.entity';

@Injectable()
export class UsuarioService extends PrincipalService<UsuarioEntity> {
    constructor(
        @InjectRepository(UsuarioEntity)
            _usuarioRepository: Repository<UsuarioEntity>,
    ) {
        super(_usuarioRepository, UsuarioEntity);
    }
}
