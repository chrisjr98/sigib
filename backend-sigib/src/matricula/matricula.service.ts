import {Injectable} from '@nestjs/common';
import {PrincipalService} from '../principal/principal.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {MatriculaEntity} from './matricula.entity';

@Injectable()
export class MatriculaService extends PrincipalService<MatriculaEntity> {
    constructor(
        @InjectRepository(MatriculaEntity)
            // tslint:disable-next-line:variable-name
            _matriculaRepository: Repository<MatriculaEntity>,
    ) {
        super(_matriculaRepository, MatriculaEntity);
    }
}
