import {Injectable} from '@nestjs/common';
import {PrincipalService} from '../principal/principal.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {RegistroNotaEntity} from './registro-nota.entity';

@Injectable()
export class RegistroNotaService extends PrincipalService<RegistroNotaEntity> {
    constructor(
        @InjectRepository(RegistroNotaEntity)
            // tslint:disable-next-line:variable-name
            _registroNotaRepository: Repository<RegistroNotaEntity>,
    ) {
        super(_registroNotaRepository, RegistroNotaEntity);
    }
}
