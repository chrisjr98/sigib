import {Controller} from '@nestjs/common';
import {PrincipalAbstractController} from '../principal/principal-abstract-controller';
import {CursoService} from './curso.service';
import {CursoEntity} from './curso.entity';

@Controller('curso')
export class CursoController extends PrincipalAbstractController<CursoEntity> {
    // tslint:disable-next-line:variable-name
    constructor(private readonly _cursoService: CursoService) {
        super(_cursoService);
    }
}
