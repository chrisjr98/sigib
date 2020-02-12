import {Injectable} from '@nestjs/common';
import {PrincipalService} from '../principal/principal.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {MateriaEntity} from './materia.entity';

@Injectable()
export class MateriaService extends PrincipalService<MateriaEntity> {
    constructor(
        @InjectRepository(MateriaEntity)
            // tslint:disable-next-line:variable-name
            _materiaRepository: Repository<MateriaEntity>,
    ) {
        super(_materiaRepository, MateriaEntity);
    }
}
