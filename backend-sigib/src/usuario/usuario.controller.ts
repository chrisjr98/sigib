import {Controller} from '@nestjs/common';
import {PrincipalAbstractController} from '../principal/principal-abstract-controller';
import {UsuarioService} from './usuario.service';
import {UsuarioEntity} from './usuario.entity';

@Controller('usuario')
export class UsuarioController extends PrincipalAbstractController<UsuarioEntity> {
    constructor(private readonly _usuarioService: UsuarioService) {
        super(_usuarioService);
    }
}
