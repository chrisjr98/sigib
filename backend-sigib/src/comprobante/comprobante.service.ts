import {Injectable} from '@nestjs/common';
import {PrincipalService} from '../principal/principal.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ComprobanteEntity} from './comprobante.entity';

@Injectable()
export class ComprobanteService extends PrincipalService<ComprobanteEntity> {
    constructor(
        @InjectRepository(ComprobanteEntity)
            _comprobanteRepository: Repository<ComprobanteEntity>,
    ) {
        super(_comprobanteRepository, ComprobanteEntity);
    }
}
