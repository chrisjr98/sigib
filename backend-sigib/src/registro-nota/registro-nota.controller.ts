import {Controller} from '@nestjs/common';
import {PrincipalAbstractController} from '../principal/principal-abstract-controller';
import {RegistroNotaService} from './registro-nota.service';
import {RegistroNotaEntity} from './registro-nota.entity';

@Controller('registro-nota')
export class RegistroNotaController extends PrincipalAbstractController<RegistroNotaEntity> {
    // tslint:disable-next-line:variable-name
    constructor(private readonly _registroNotaService: RegistroNotaService) {
        super(_registroNotaService);
    }
}
