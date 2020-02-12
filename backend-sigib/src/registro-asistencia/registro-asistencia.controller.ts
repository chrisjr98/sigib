import {Controller} from '@nestjs/common';
import {PrincipalAbstractController} from '../principal/principal-abstract-controller';
import {RegistroAsistenciaService} from './registro-asistencia.service';
import {RegistroAsistenciaEntity} from './registro-asistencia.entity';

@Controller('registro-asistencia')
export class RegistroAsistenciaController extends PrincipalAbstractController<RegistroAsistenciaEntity> {
    // tslint:disable-next-line:variable-name
    constructor(private readonly _registroAsistenciaService: RegistroAsistenciaService) {
        super(_registroAsistenciaService);
    }
}
