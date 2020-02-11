import {Injectable} from '@nestjs/common';
import {PrincipalService} from '../principal/principal.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CursoEntity} from './curso.entity';

@Injectable()
export class CursoService extends PrincipalService<CursoEntity> {
    constructor(
        @InjectRepository(CursoEntity)
            // tslint:disable-next-line:variable-name
            _cursoRepository: Repository<CursoEntity>,
    ) {
        super(_cursoRepository, CursoEntity);
    }
}
