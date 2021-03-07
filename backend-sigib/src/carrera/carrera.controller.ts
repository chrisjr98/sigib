import {Controller} from '@nestjs/common';
import {PrincipalAbstractController} from '../principal/principal-abstract-controller';
import {CarreraService} from './carrera.service';
import {CarreraEntity} from './carrera.entity';

@Controller('carrera')
export class CarreraController extends PrincipalAbstractController<CarreraEntity> {
    // tslint:disable-next-line:variable-name
    constructor(private readonly _carreraService: CarreraService) {
        super(_carreraService);
    }
}
