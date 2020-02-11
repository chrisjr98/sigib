import {Injectable} from '@nestjs/common';
import {PrincipalService} from '../principal/principal.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ProfesorEntity} from './profesor.entity';

@Injectable()
export class ProfesorService extends PrincipalService<ProfesorEntity> {
    constructor(
        @InjectRepository(ProfesorEntity)
            // tslint:disable-next-line:variable-name
            _profesorRepository: Repository<ProfesorEntity>,
    ) {
        super(_profesorRepository, ProfesorEntity);
    }
}
