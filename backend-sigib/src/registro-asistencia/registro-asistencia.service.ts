import {Injectable} from '@nestjs/common';
import {PrincipalService} from '../principal/principal.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {RegistroAsistenciaEntity} from './registro-asistencia.entity';

@Injectable()
export class RegistroAsistenciaService extends PrincipalService<RegistroAsistenciaEntity> {
    constructor(
        @InjectRepository(RegistroAsistenciaEntity)
            // tslint:disable-next-line:variable-name
            _registroAsistenciaRepository: Repository<RegistroAsistenciaEntity>,
    ) {
        super(_registroAsistenciaRepository, RegistroAsistenciaEntity);
    }
}
