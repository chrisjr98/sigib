import {Controller} from '@nestjs/common';
import {PrincipalAbstractController} from '../principal/principal-abstract-controller';
import {MatriculaService} from './matricula.service';
import {MatriculaEntity} from './matricula.entity';

@Controller('matricula')
export class MatriculaController extends PrincipalAbstractController<MatriculaEntity> {
    // tslint:disable-next-line:variable-name
    constructor(private readonly _matriculaService: MatriculaService) {
        super(_matriculaService);
    }
}
