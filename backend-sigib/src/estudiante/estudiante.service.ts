import {Injectable} from '@nestjs/common';
import {PrincipalService} from '../principal/principal.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {EstudianteEntity} from './estudiante.entity';

@Injectable()
export class EstudianteService extends PrincipalService<EstudianteEntity> {
    constructor(
        @InjectRepository(EstudianteEntity)
            // tslint:disable-next-line:variable-name
            _estudianteRepository: Repository<EstudianteEntity>,
    ) {
        super(_estudianteRepository, EstudianteEntity);
    }
}
