import {Controller} from '@nestjs/common';
import {PrincipalAbstractController} from '../principal/principal-abstract-controller';
import {ProfesorService} from './profesor.service';
import {ProfesorEntity} from './profesor.entity';

@Controller('profesor')
export class ProfesorController extends PrincipalAbstractController<ProfesorEntity> {
    // tslint:disable-next-line:variable-name
    constructor(private readonly _profesorService: ProfesorService) {
        super(_profesorService);
    }
}
