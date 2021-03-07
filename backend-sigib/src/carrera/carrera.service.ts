import {Injectable} from '@nestjs/common';
import {PrincipalService} from '../principal/principal.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CarreraEntity} from './carrera.entity';

@Injectable()
export class CarreraService extends PrincipalService<CarreraEntity> {
    constructor(
        @InjectRepository(CarreraEntity)
            // tslint:disable-next-line:variable-name
            _carreraRepository: Repository<CarreraEntity>,
    ) {
        super(_carreraRepository, CarreraEntity);
    }
}
