import {Controller} from '@nestjs/common';
import {PrincipalAbstractController} from '../principal/principal-abstract-controller';
import {ComprobanteService} from './comprobante.service';
import {ComprobanteEntity} from './comprobante.entity';

@Controller('comprobante')
export class ComprobanteController extends PrincipalAbstractController<ComprobanteEntity> {
    constructor(private readonly _comprobanteService: ComprobanteService) {
        super(_comprobanteService);
    }
}
