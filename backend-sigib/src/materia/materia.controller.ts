import {Controller} from '@nestjs/common';
import {PrincipalAbstractController} from '../principal/principal-abstract-controller';
import {MateriaService} from './materia.service';
import {MateriaEntity} from './materia.entity';

@Controller('materia')
export class MateriaController extends PrincipalAbstractController<MateriaEntity> {
    // tslint:disable-next-line:variable-name
    constructor(private readonly _materiaService: MateriaService) {
        super(_materiaService);
    }
}
